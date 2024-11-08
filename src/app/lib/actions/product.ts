'use server';
import axios from 'axios';
import { notFound } from 'next/navigation';
import 'server-only';
import { FilterOptions } from '../types';
const BACK_API = process.env.MORTSHOP_API;
const api = axios.create({
	baseURL: `${BACK_API}api/product/`,
});
export async function getProducts(params: FilterOptions) {
	const { categoryId, priceRange, sortBy, order, search } = params;

	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const data = {
		categoryId: categoryId || 0,
		priceRange: priceRange || '',
		sortBy: sortBy || '',
		order: order || 'asc',
		search: search || '',
	};
	try {
		const res = await api.post('products', data, config);
		return res.data.filtered_products;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response?.status == 404) {
			return notFound();
		}
	}
}
export async function getProductById(id: number) {
	try {
		const res = await api.get(`/${id}`);
		return res.data.product;
	} catch (error: unknown) {
		if (axios.isAxiosError(error) && error.response?.status == 404) {
			return notFound();
		}
	}
}
