'use server';
import axios from 'axios';
import { cookies } from 'next/headers';
import { CartItemSchema } from '../types';
const BACK_API = process.env.MORTSHOP_API;

function createApiClient() {
	const authToken = cookies().get('authToken')?.value;

	return axios.create({
		baseURL: `${BACK_API}api/cart/`,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `JWT ${authToken}`,
		},
	});
}

export async function getCartItems() {
	const api = createApiClient();

	
	try {
		const res = await api.get('cart-items');
		if (res.status === 200) {
			return res.data.products;
		}
	} catch (error) {
		console.error('Error getting cart items:', error);
		return;
	}
}

export async function addCartItem(productId: number) {
	const api = createApiClient();

	try {
		const res = await api.post('add-item', { product_id: productId });

		if (res.status === 200) {
			return true;
		}
	} catch (error: unknown) {
		if (axios.isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error || 'An error occurred');
		} else {
			throw new Error('An unknown error occurred');
		}
	}
}

export async function totalCartPrice() {
	const api = createApiClient();

	try {
		const res = await api.get('total');
		if (res.status === 200) {
			return res.data.total_cost;
		}
	} catch (error) {
		console.error('Error getting total cart price:', error);
	}
}

export async function totalCartItems() {
	const api = createApiClient();

	try {
		const res = await api.get('total-items');
		if (res.status === 200) {
			return res.data.total_items;
		}
	} catch (error) {
		console.error('Error getting total cart items:', error);
	}
}

// Actualizar la cantidad de items en el carrito
export async function updateItemCount(productId: number, count: number) {
	const api = createApiClient();
	const body = {
		product_id: productId,
		count: count,
	};

	try {
		const res = await api.put('update-item', body);
		if (res.status === 200) {
			return true;
		}
	} catch (error) {
		if (axios.isAxiosError(error) && error.response?.status === 403) {
			throw new Error('Outstock');
		}
	}
}

// Eliminar un item del carrito
export async function removeCartItem(productId: number) {
	const api = createApiClient();

	try {
		const res = await api.delete(`remove-item/${productId}`);
		if (res.status === 200) {
			return res.data.cart;
		}
	} catch {
		return;
	}
}

// Vaciar el carrito
export async function emptyCart() {
	const api = createApiClient();

	try {
		const res = await api.delete('empty-cart');
		console.log(res);

		if (res.status === 200) {
			return true;
		}
	} catch (error: unknown) {
		if (axios.isAxiosError(error) && error.response?.status === 409) {
			throw new Error('AlreadyIsEmpty');
		}
	}
}
export async function SyncCart(cartItems: CartItemSchema[]) {
	const api = createApiClient();
	console.log(cartItems);

	try {
		const res = await api.put('SyncCart', { cart_items: cartItems });
		console.log(res);

		if (res.status === 200) {
			return true;
		}
	} catch (error) {
		if (axios.isAxiosError(error) && error.response?.status === 500) {
			throw new Error('Your cart is already empty');
		}
	}
}
