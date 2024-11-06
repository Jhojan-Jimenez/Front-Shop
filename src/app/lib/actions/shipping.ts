'use server';
import axios from 'axios';
import 'server-only';
const api = axios.create({
	baseURL: 'http://127.0.0.1:8000/api/shipping/',
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
