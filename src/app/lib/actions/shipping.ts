'use server';
import axios from 'axios';
import 'server-only';
const BACK_API = process.env.MORTSHOP_API;
const api = axios.create({
	baseURL: `${BACK_API}api/shipping/`,
});
export async function getShippingOptions() {
	try {
		const res = await api.get('shipping-options');
		if (res.status === 200) {
			return res.data.shipping_options;
		}
	} catch (error) {
		console.error('Error getting cart items:', error);
		return;
	}
}
