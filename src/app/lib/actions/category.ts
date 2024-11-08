'use server';
import axios from 'axios';
import 'server-only';
const NEXT_PUBLIC_MORTSHOP_API = process.env.MORTSHOP_API;
const api = axios.create({
	baseURL: `${NEXT_PUBLIC_MORTSHOP_API}api/category/`,
});
export async function getCategories() {
	console.log(NEXT_PUBLIC_MORTSHOP_API);
	
	const res = await api.get('categories');
	return res.data.categories;
}
