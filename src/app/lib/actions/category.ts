'use server';
import axios from 'axios';
import 'server-only';

const api = axios.create({
	baseURL: 'http://127.0.0.1:8000/api/category/',
});
export async function getCategories() {
	const res = await api.get('categories');
	return res.data.categories;
}
