'use server';
import axios from 'axios';
import { cookies } from 'next/headers';
const BACK_API = process.env.MORTSHOP_API;
function createApiClient() {
	const authToken = cookies().get('authToken')?.value;

	return axios.create({
		baseURL: `${BACK_API}api/reviews/`,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `JWT ${authToken}`,
		},
	});
}
export async function getReviews(productId: number) {
	const api = axios.create({
		baseURL: `${BACK_API}api/reviews/`,
		headers: {
			'Content-Type': 'application/json',
		},
	});

	try {
		const res = await api.get(`get-reviews/${productId}`);

		if (res.status === 200) {
			return res.data.reviews;
		}
	} catch (error) {
		console.error('Error getting cart items:', error);
		return;
	}
}
export async function createReview(
	productId: number,
	{ rating, comment }: { rating: number; comment: string }
) {
	const api = createApiClient();
	const body = {
		rating,
		comment,
	};
	try {
		const res = await api.post(`create-review/${productId}`, body);

		if (res.status === 201) {
			return res.data.reviews;
		}
	} catch (error: unknown) {
		console.log(error);

		if (
			axios.isAxiosError(error) &&
			error.response?.data?.error === 'Review for this course already created'
		) {
			throw new Error('AlreadyHaveReview');
		}
		return;
	}
}
export async function editReview(
	productId: number,
	{ rating, comment }: { rating: number; comment: string }
) {
	const api = createApiClient();
	const body = {
		rating,
		comment,
	};
	try {
		const res = await api.put(`update-review/${productId}`, body);

		if (res.status === 200) {
			return res.data.reviews;
		}
	} catch (error) {
		if (
			axios.isAxiosError(error) &&
			error.response?.data?.error === 'Review for this course already created'
		) {
			throw new Error('AlreadyHaveReview');
		}
		return;
	}
}
export async function removeReview(productId: number) {
	const api = createApiClient();
	try {
		const res = await api.delete(`delete-review/${productId}`);

		if (res.status === 200) {
			return res.data.reviews;
		}
	} catch {
		return;
	}
}
