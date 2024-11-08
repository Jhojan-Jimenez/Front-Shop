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

interface AuthContextType {
	user: UserSchema | null;
	// eslint-disable-next-line no-unused-vars
	login: (user: LoginUser) => Promise<void>;
	logout: () => Promise<void>;
	refreshLogin: () => Promise<void>;
	isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
	user: null,
	login: async () => {},
	logout: async () => {},
	refreshLogin: async () => {},
	isLoading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const { setLoading } = useLoading();
	const [user, setUser] = useState<UserSchema | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const fetchUser = async () => {
			try {
				setIsLoading(true);

				const token = await getToken();
				if (token) {
					const { id, email, first_name, last_name } = await decrypt(token);
					setUser({ id, email, first_name, last_name });
				}
			} catch (error: unknown) {
				if (error instanceof Error && error.message === 'InvalidToken') {
					toast.error('Please log in again.');
				} else {
					console.error('Error loading user data:', error);
				}
			} finally {
				setIsLoading(false);
			}
		};

		// Ejecutar la función de fetch si no tenemos usuario en localStorage
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
			if (error.message == 'Error creating session') {
				throw new Error('DoesNotExistUser');
			}
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
			console.error('Error logging out:', error);
			toast.error('Error logging out.');
		} finally {
			setLoading(false);
		}
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
				toast.success('Session refreshed successfully!');
			} else {
				toast.error('Refresh token not available.');
			}
		} catch (error) {
			console.error('Error refreshing session:', error);
			toast.error('Error refreshing session.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<AuthContext.Provider
			value={{ user, login, logout, refreshLogin, isLoading }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
