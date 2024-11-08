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
	encrypt,
	getRefresh,
	getToken,
	refreshAuthToken,
} from '../lib/actions/sessions';
import { LoginUser, UserSchema } from '../lib/types';

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
	const [user, setUser] = useState<UserSchema | null>(null);

	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const currentStorageUser = localStorage.getItem('user');
		const parsedUser = currentStorageUser
			? JSON.parse(currentStorageUser)
			: null;
		const isValidUser =
			parsedUser && Object.keys(parsedUser).length > 0 ? parsedUser : null;
		setUser(isValidUser);
		const fetchUser = async () => {
			try {
				setIsLoading(true);
				const token = await getToken();
				if (token) {
					const { id, email, first_name, last_name } = await decrypt(token);
					setUser({ id, email, first_name, last_name });
					const storageUser = JSON.stringify({
						id,
						email,
						first_name,
						last_name,
					});
					localStorage.setItem('user', storageUser);
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

		fetchUser(); // Luego intenta actualizar el usuario con el token si es posible
	}, []);

	const login = async ({ email, password }: LoginUser) => {
		setIsLoading(true);
		try {
			const newUser = await createSession(email, password);
			const { refresh, access } = await encrypt(email, password);
			localStorage.setItem('authToken', access);
			localStorage.setItem('refreshToken', refresh);

			const {
				id,
				email: decryptedEmail,
				first_name,
				last_name,
			} = await decrypt(newUser);
			setUser({ id, email: decryptedEmail, first_name, last_name });
			toast.success('Logged in successfully!');
		} catch (error: unknown) {
			if (
				error instanceof Error &&
				error.message === 'Error creating session'
			) {
				throw new Error('DoesNotExistUser');
			}
			toast.error('Error logging in.');
		} finally {
			setIsLoading(false);
		}
	};

	const logout = async () => {
		localStorage.removeItem('authToken');
		localStorage.removeItem('refreshToken');
		localStorage.removeItem('user');
		setIsLoading(true);
		try {
			await deleteSession();
			setUser(null);
			router.push('/login');
			toast.success('Session closed successfully.');
		} catch (error) {
			console.error('Error logging out:', error);
			toast.error('Error logging out.');
		} finally {
			setIsLoading(false);
		}
	};

	const refreshLogin = async () => {
		setIsLoading(true);
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
			setIsLoading(false);
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
