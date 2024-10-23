'use client';
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';
import { CartItemSchema } from '../lib/types';
import { useLoading } from './LoadingContext';
import { getCartItems } from '../lib/actions/cart';
import { getToken } from '../lib/actions/sessions';
import toast from 'react-hot-toast';

interface CartContextType {
	total: () => number;
	userCartItems: CartItemSchema[];
	SetCartItems: any;
}
const CartContext = createContext<CartContextType>({
	total: () => 0,
	userCartItems: [],
	SetCartItems: () => {},
});
export const CartProvider = ({ children }: { children: ReactNode }) => {
	const { setLoading } = useLoading();
	const [userCartItems, SetCartItems] = useState([]);
	useEffect(() => {
		const fetchCart = async () => {
			setLoading(true);
			try {
				const storedUser = await getToken();
				if (storedUser) {
					const cartProds = await getCartItems();
					SetCartItems(cartProds);
				}
			} catch (error: any) {
				toast.error('Error loading user Cart Items');
			} finally {
				setLoading(false);
			}
		};
		fetchCart();
	}, []);
	const total = () => {
		let total = 0;
		if (userCartItems?.length > 0) {
			userCartItems.forEach((item: CartItemSchema) => {
				total += item.count * item.product.price;
			});
		}
		return total;
	};
	return (
		<CartContext.Provider value={{ userCartItems, SetCartItems, total }}>
			{children}
		</CartContext.Provider>
	);
};
export const useCart = () => {
	return useContext(CartContext);
};
export default CartContext;
