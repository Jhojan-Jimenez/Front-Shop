'use client';
import { createContext, ReactNode, useContext, useState } from 'react';
import Loader from '../ui/modals/Loader';

interface LoadingContextType {
	loading: boolean;
	setLoading: any;
}
const LoadingContext = createContext<LoadingContextType>({
	loading: false,
	setLoading: () => {},
});
export const LoadingProvider = ({ children }: { children: ReactNode }) => {
	const [loading, setLoading] = useState(false);
	return (
		<LoadingContext.Provider value={{ loading, setLoading }}>
			{loading && <Loader />}
			{children}
		</LoadingContext.Provider>
	);
};
export const useLoading = () => {
	return useContext(LoadingContext);
};
export default LoadingContext;
