'use server';
import axios from 'axios';
import { cookies } from 'next/headers';

function createApiClient() {
	const authToken = cookies().get('authToken')?.value;

	return axios.create({
		baseURL: 'http://127.0.0.1:8000/api/reviews/',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `JWT ${authToken}`,
		},
	});
}
export async function getReviews(productId: number) {
	const api = createApiClient();

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

		if (res.status === 200) {
			return res.data.reviews;
		}
	} catch (error: unknown) {
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
