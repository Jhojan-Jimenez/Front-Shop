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
} from '../lib/sessions';
import { LoginUser } from '../lib/types';
import Loader from '../ui/modals/Loader';
import { useLoading } from './LoadingContext';

// Tipado del contexto para que refleje correctamente los tipos de los valores y funciones
interface AuthContextType {
	user: LoginUser | null;
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
	const [user, setUser] = useState<LoginUser | null>(null);
	const router = useRouter();

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const storedUser = await getToken();
				if (storedUser) {
					const { email, password } = await decrypt(storedUser);
					setUser({ email, password });
				}
			} catch (error: any) {
				if (error.message === 'InvalidToken') {
					toast.error('Log in again');
				}
				toast.error('Error fetching user from cookie');
			}
		};
		fetchUser();
	}, []);

	const login = async ({ email, password }: LoginUser) => {
		try {
			await createSession(email, password);
			setUser({ email, password });
		} catch (error) {
			toast.error('Error during login');
		}
	};

	const logout = async () => {
		try {
			await deleteSession();
			setUser(null);
			router.push('/login');
		} catch (error) {
			toast.error('Error during logout');
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
					const { email, password } = await decrypt(storedUser);
					setUser({ email, password });
				}
			}
		} catch (error) {
			console.log(error);
      return
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
