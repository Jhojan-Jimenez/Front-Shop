import { useState } from 'react';
import toast from 'react-hot-toast';

export const useLoader = () => {
	const [loading, setLoading] = useState(false);

	// Función que ejecuta una tarea asíncrona con el loader activado
	const withLoader = async (
		asyncFunction: () => Promise<void>,
		onSuccessMessage: string
	) => {
		setLoading(true); // Activa el loader
		try {
			await asyncFunction(); // Ejecuta la función asíncrona
			toast.success(onSuccessMessage); // Muestra un toast de éxito
		} catch (error: any) {
			throw error;
		} finally {
			setLoading(false); // Desactiva el loader
		}
	};

	return { loading, withLoader };
};
