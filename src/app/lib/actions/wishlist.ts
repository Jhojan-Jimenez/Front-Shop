'use server';
import axios from 'axios';
import { cookies } from 'next/headers';
const BACK_API = process.env.MORTSHOP_API;
function createApiClient() {
	const authToken = cookies().get('authToken')?.value;

	return axios.create({
		baseURL: `${BACK_API}api/wishlist/`,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `JWT ${authToken}`,
		},
	});
}
export async function getWishList() {
	const api = createApiClient();

	try {
		const res = await api.get('');

		if (res.status === 200) {
			return res.data.wishlist;
		}
	} catch (error) {
		console.error('Error getting wish items:', error);
		return;
	}
}
export async function addWishListItem(productId: number) {
	const api = createApiClient();
	const body = { product_id: productId };

	try {
		const res = await api.post('add-item', body);

		if (res.status === 200) {
			return res.data.wishlist;
		}
	} catch (error) {
		if (axios.isAxiosError(error) && error.response?.status === 409) {
			throw new Error('ItemAlreadyInWishlist');
		}
		return;
	}
}
export async function removeWishListItem(productId: number) {
	const api = createApiClient();
	try {
		const res = await api.delete(`remove-item/${productId}`);

		if (res.status === 200) {
			return res.data.wishlist;
		}
	} catch (error) {
		console.error('Error remove wish items:', error);
		return;
	}
}
export async function haveWishListItem(productId: number) {
	const api = createApiClient();
	try {
		const res = await api.get(`exist-item/${productId}`);

		if (res.status === 200) {
			return res.data.exists;
		}
	} catch (error) {
		console.error('Error in have WishList items:', error);
		return;
	}
}
