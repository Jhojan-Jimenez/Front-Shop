import { LoginUser, RegisterUser } from './types';
import axios, { AxiosResponse } from 'axios';
const api = axios.create({
	baseURL: 'http://127.0.0.1:8000/',
});
export class Users {
	static async signup({
		email,
		first_name,
		last_name,
		password,
		re_password,
	}: RegisterUser) {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const body = JSON.stringify({
			email,
			first_name,
			last_name,
			password,
			re_password,
		});

		const res: AxiosResponse = await api.post('auth/users/', body, config);
		return res;
	}
	static async signin({ email, password }: LoginUser) {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const body = JSON.stringify({
			email: email,
			password: password,
		});
		const res = await api.post('auth/jwt/create/', body, config);
		return res;
	}
}
