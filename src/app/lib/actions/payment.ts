'use server';
import axios from 'axios';
import { cookies } from 'next/headers';
import { PaymentOrderSchema } from '../types';
const BACK_API = process.env.MORTSHOP_API;
function createApiClient() {
	const authToken = cookies().get('authToken')?.value;

	return axios.create({
		baseURL: `${BACK_API}api/payment/`,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `JWT ${authToken}`,
		},
	});
}
export async function paymentTotal(shippingId: number, couponName: string) {
	const api = createApiClient();

	try {
		const res = await api.get(
			`payment-total?shipping_id=${shippingId}&coupon_name=${couponName}`
		);
		if (res.status === 200) {
			return res.data.products;
		}
	} catch (error) {
		console.error('Error getting cart items:', error);
		return;
	}
}
export async function makePayment(data: PaymentOrderSchema) {
	const api = createApiClient();
	const body = { ...data };

	try {
		const res = await api.post('make-payment', body);

		if (res.status === 200) {
			return res.data.success;
		}
	} catch (error) {
		if (axios.isAxiosError(error) && error.response?.status === 404) {
			throw new Error('NotCartItems');
		}
	}
}
