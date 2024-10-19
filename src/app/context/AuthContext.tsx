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

// Tipado del contexto para que refleje correctamente los tipos de los valores y funciones
interface AuthContextType {
	user: UserSchema | null;
	// eslint-disable-next-line no-unused-vars
	login: (user: LoginUser) => Promise<void>;
	logout: () => Promise<void>;
	refreshLogin: () => void;
}

const AuthContext = createContext<AuthContextType>({
	user: null,
	login: async () => {},
	logout: async () => {},
	refreshLogin: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const { setLoading } = useLoading();
	const [user, setUser] = useState<UserSchema | null>(null);
	const router = useRouter();

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const storedUser = await getToken();
				if (storedUser) {
					const { id, email, first_name, last_name } =
						await decrypt(storedUser);
					setUser({ id, email, first_name, last_name });
				}
			} catch (error: any) {
				if (error.message === 'InvalidToken') {
					toast.error('Log in again');
				}
				// Error fetching user from cookie
				toast.error('Stored user server error');
			}
		};
		fetchUser();
	}, []);

	const login = async ({ email, password }: LoginUser) => {
		try {
			const newUser = await createSession(email, password);
			const { id, email_, first_name, last_name } = await decrypt(newUser);
			setUser({ id, email: email_, first_name, last_name });
		} catch (error) {
			toast.error('Login server error');
		}
	};

	const logout = async () => {
		try {
			await deleteSession();
			setUser(null);
			router.push('/login');
			toast.error('Session closed correctly');
		} catch (error) {
			toast.error('Logout server error');
		}
	};

	const refreshLogin = async () => {
		try {
			setLoading(true);
			const refreshToken = await getRefresh();
			if (refreshToken) {
				await refreshAuthToken();
				const storedUser = await getToken();
				if (storedUser) {
					const { id, email, first_name, last_name } =
						await decrypt(storedUser);
					setUser({ id, email, first_name, last_name });
				}
			}
		} catch (error) {
			console.log(error);
			return;
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
export const useAuth = () => {
	return useContext(AuthContext);
};

export default AuthContext;
