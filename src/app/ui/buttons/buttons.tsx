import { useCart } from '@/app/context/CartContext';
import { emptyCart } from '@/app/lib/actions/cart';
import toast from 'react-hot-toast';
export const ClearCartButton = () => {
	const { SetCartItems } = useCart();
	const handleClearCart = async () => {
		const confirmed = window.confirm(
			'¿Estás seguro de que quieres borrar todos los elementos del carrito?'
		);
		if (confirmed) {
			try {
				await emptyCart();
				SetCartItems([]);
				toast.success('Todos los elementos del carrito han sido borrados.'); //
			} catch (error) {
				if (error instanceof Error && error.message === 'AlreadyIsEmpty') {
					return toast.success('Your cart already is empty');
				}
			}
		} else {
			toast.error('El carrito no ha sido modificado.');
		}
	};

	return (
		<button
			onClick={handleClearCart}
			className='inline-flex items-center px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500'
		>
			Remove all cart items
		</button>
	);
};
