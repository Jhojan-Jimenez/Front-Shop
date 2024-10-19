'use server';
import axios from 'axios';
import { notFound } from 'next/navigation';
import 'server-only';

const api = axios.create({
	baseURL: 'http://127.0.0.1:8000/',
});
export async function getProducts() {
	const res = await api.get('api/product/products');
	return res.data.products;
}
export async function getProductById(id: number) {
	try {
		const res = await api.get(`api/product/product/${id}`);
		return res.data.product;
	} catch (error: any) {
		if (error.status == 404) {
			return notFound();
		}
	}
}
