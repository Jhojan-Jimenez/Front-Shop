'use server';
import axios from 'axios';
import { cookies } from 'next/headers';

const BACK_API = process.env.MORTSHOP_API;

function createApiClient() {
	const authToken = cookies().get('authToken')?.value;

	return axios.create({
		baseURL: `${BACK_API}api/orders/`,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `JWT ${authToken}`,
		},
	});
}
export async function getOrders() {
	const api = createApiClient();
	try {
		const res = await api.get('/');
		if (res.status === 200) {
			return res.data.orders;
		}
	} catch (error) {
		console.error('Error getting cart items:', error);
		return;
	}
}
export async function getOrderById(id: string) {
	const api = createApiClient();
	try {
		const res = await api.get(`/${id}`);
		if (res.status === 200) {
			return res.data.order;
		}
	} catch (error) {
		console.error('Error getting cart items:', error);
		return;
	}
}
export async function getCountries() {
	const api = createApiClient();
	try {
		const res = await api.get('countries');
		if (res.status === 200) {
			return res.data.countries;
		}
	} catch (error) {
		console.error('Error getting cart items:', error);
		return;
	}
}
