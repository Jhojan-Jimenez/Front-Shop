'use client';
import { useRouter } from 'next/navigation';
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';
import toast from 'react-hot-toast';
import {
	createSession,
	decrypt,
	deleteSession,
	getRefresh,
	getToken,
	refreshAuthToken,
} from '../lib/actions/sessions';
import { LoginUser, UserSchema } from '../lib/types';
import { useLoading } from './LoadingContext';

// Tipado del contexto con los tipos de valores y funciones
interface AuthContextType {
	user: UserSchema | null;
	login: (user: LoginUser) => Promise<void>;
	logout: () => Promise<void>;
	refreshLogin: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
	user: null,
	login: async () => {},
	logout: async () => {},
	refreshLogin: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const { setLoading } = useLoading();
	const [user, setUser] = useState<UserSchema | null>(null);
	const router = useRouter();

	useEffect(() => {
		const fetchUser = async () => {
			setLoading(true);
			try {
				const storedUser = await getToken();
				if (storedUser) {
					const { id, email, first_name, last_name } =
						await decrypt(storedUser);
					setUser({ id, email, first_name, last_name });
				}
			} catch (error: any) {
				if (error.message === 'InvalidToken') {
					toast.error('Please log in again.');
				} else {
					toast.error('Error loading user data.');
				}
			} finally {
				setLoading(false);
			}
		};
		fetchUser();
	}, []);

	const login = async ({ email, password }: LoginUser) => {
		setLoading(true);
		try {
			const newUser = await createSession(email, password);
			const {
				id,
				email: decryptedEmail,
				first_name,
				last_name,
			} = await decrypt(newUser);
			setUser({ id, email: decryptedEmail, first_name, last_name });
			toast.success('Logged in successfully!');
		} catch (error) {
			toast.error('Error logging in.');
		} finally {
			setLoading(false);
		}
	};

	const logout = async () => {
		setLoading(true);
		try {
			await deleteSession();
			setUser(null);
			router.push('/login');
			toast.success('Session closed successfully.');
		} catch (error) {
			toast.error('Error logging out.');
		}
		setLoading(false);
	};

	const refreshLogin = async () => {
		setLoading(true);
		try {
			const refreshToken = await getRefresh();
			if (refreshToken) {
				await refreshAuthToken();
				const storedUser = await getToken();
				if (storedUser) {
					const { id, email, first_name, last_name } =
						await decrypt(storedUser);
					setUser({ id, email, first_name, last_name });
				}
				toast.success('Logged in successfully!');
			} else {
				toast.error('Refresh token not available.');
			}
		} catch (error) {
			toast.error('Error refreshing session.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<AuthContext.Provider value={{ user, login, logout, refreshLogin }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
