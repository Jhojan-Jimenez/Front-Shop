'use server';
import axios from 'axios';
import { notFound } from 'next/navigation';
import 'server-only';
import { FilterOptions } from '../types';

const api = axios.create({
	baseURL: 'http://127.0.0.1:8000/',
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
	const res = await api.post('api/product/products', data, config);
	return res.data.filtered_products;
}
export async function getProductById(id: number) {
	try {
		const res = await api.get(`api/product/${id}`);
		return res.data.product;
	} catch (error: any) {
		if (error.status == 404) {
			return notFound();
		}
	}
}
