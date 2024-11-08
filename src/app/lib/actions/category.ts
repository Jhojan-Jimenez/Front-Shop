'use server';
import axios from 'axios';
import 'server-only';
const BACK_API = process.env.MORTSHOP_API;
const api = axios.create({
	baseURL: `${BACK_API}api/category/`,
});
export async function getCategories() {
	const res = await api.get('categories');
	return res.data.categories;
}
