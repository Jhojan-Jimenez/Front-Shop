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
import { Unk } from '../lib/actions/AnonymUser';

interface CartContextType {
	total: () => number;
	userCartItems: CartItemSchema[];
	SetCartItems: React.Dispatch<React.SetStateAction<CartItemSchema[]>>;
	couponCode: { name: string; discount_price: number } | null;
	setCouponCode: React.Dispatch<
		React.SetStateAction<{ name: string; discount_price: number } | null>
	>;
}
const CartContext = createContext<CartContextType>({
	total: () => 0,
	userCartItems: [],
	SetCartItems: () => {},
	couponCode: null,
	setCouponCode: () => {},
});
export const CartProvider = ({ children }: { children: ReactNode }) => {
	const { setLoading } = useLoading();
	const [userCartItems, SetCartItems] = useState<CartItemSchema[]>([]);
	const [couponCode, setCouponCode] = useState<{
		name: string;
		discount_price: number;
	} | null>(null);
	useEffect(() => {
		const fetchCart = async () => {
			setLoading(true);
			try {
				const storedUser = await getToken();
				if (storedUser) {
					const cartProds = await getCartItems();
					SetCartItems(cartProds);
				} else {
					const cartProds = await Unk.getCartItems();
					SetCartItems(cartProds);
				}
				return;
			} catch {
				toast.error('Error loading user Cart Items');
			} finally {
				setLoading(false);
			}
		};
		fetchCart();
	}, [setLoading]);
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
		<CartContext.Provider
			value={{ userCartItems, SetCartItems, total, couponCode, setCouponCode }}
		>
			{children}
		</CartContext.Provider>
	);
};
export const useCart = () => {
	return useContext(CartContext);
};
export default CartContext;
