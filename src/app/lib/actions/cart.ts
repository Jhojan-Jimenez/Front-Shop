'use server';
import axios from 'axios';
import { cookies } from 'next/headers';
import { CartItemSchema } from '../types';

// Función auxiliar para crear una instancia de Axios con el token de las cookies
function createApiClient() {
	const authToken = cookies().get('authToken')?.value;

	return axios.create({
		baseURL: 'http://127.0.0.1:8000/api/cart/',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `JWT ${authToken}`,
		},
	});
}

// Obtener los items del carrito
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
	} catch (error: any) {
		if (error.response) {
			throw new Error(error.response.data.error || 'An error occurred');
		} else {
			throw new Error('An unknown error occurred');
		}
	}
}

// Obtener el precio total del carrito
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

// Obtener el número total de items en el carrito
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
		if (error.response.status === 403) {
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
	} catch (error) {}
}

// Vaciar el carrito
export async function emptyCart() {
	const api = createApiClient();

	try {
		const res = await api.delete('empty-cart');
		if (res.status === 200) {
			return true;
		}
	} catch (error) {
		if (error.response.status === 404) {
			throw new Error('Your cart is already empty');
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
		if (error.response.status === 500) {
			throw new Error('Your cart is already empty');
		}
	}
}
