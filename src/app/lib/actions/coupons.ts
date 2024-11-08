'use server';
import axios from 'axios';
const BACK_API = process.env.MORTSHOP_API;
const api = axios.create({
	baseURL: `${BACK_API}api/coupons/`,
});
export async function existCoupon(name: string) {
	try {
		const res = await api.get(`check-coupon?coupon_name=${name}`);
		if (res.status === 200) {
			return res.data;
		}
	} catch (error) {
		if (axios.isAxiosError(error) && error.response?.status === 404) {
			throw new Error('NotFoundCoupon');
		}
	}
}
