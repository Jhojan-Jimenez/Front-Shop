'use client';
import React, {
	createContext,
	useState,
	useEffect,
	ReactNode,
	useContext,
} from 'react';
import { LoginUser } from '../lib/types';
import {
	createSession,
	decrypt,
	deleteSession,
	getCookie,
} from '../lib/sessions';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

// Tipado del contexto para que refleje correctamente los tipos de los valores y funciones
interface AuthContextType {
	user: LoginUser | null;
	loading: boolean;
	// eslint-disable-next-line no-unused-vars
	login: (user: LoginUser) => Promise<void>;
	logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
	user: null,
	loading: true,
	login: async () => {},
	logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<LoginUser | null>(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const storedUser = await getCookie();
        
				if (storedUser) {
					const { email, password } = await decrypt(storedUser);
					setUser({ email, password });
				}
			} catch (error) {
				toast.error('Error fetching user from cookie');
			} finally {
				setLoading(false);
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

	return (
		<AuthContext.Provider value={{ user, loading, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
export const useAuth = () => {
	return useContext(AuthContext);
};

export default AuthContext;
