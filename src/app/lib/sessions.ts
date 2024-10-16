'use server';
import 'server-only';
import { cookies } from 'next/headers';
import axios, { AxiosResponse } from 'axios';

const api = axios.create({
	baseURL: 'http://127.0.0.1:8000/',
});

export async function encrypt(email: string, password: string) {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const body = JSON.stringify({ email, password });
	try {
		const res: AxiosResponse = await api.post('auth/jwt/create/', body, config);
		return res.data;
	} catch (error) {
		console.log('Error en encrypt', error);
	}
}

export async function decrypt(session: string | undefined = '') {
	const config = {
		headers: {
			Authorization: 'JWT ' + session,
		},
	};
	try {
		const res: AxiosResponse = await api.get('auth/users/me/', config);
		return res.data;
	} catch (error) {
		console.log('Failed to verify session', error);
	}
}

export async function createSession(userEmail: string, userPassword: string) {
	const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
	const { refresh, access } = await encrypt(userEmail, userPassword);

	cookies().set('authToken', access, {
		httpOnly: true,
		secure: true,
		expires: expiresAt,
		sameSite: 'lax',
		path: '/',
	});
	cookies().set('refreshToken', refresh, {
		httpOnly: true,
		secure: true,
		expires: expiresAt,
		sameSite: 'lax',
		path: '/',
	});
}

export async function updateSession() {
	const session = cookies().get('session')?.value;
	const payload = await decrypt(session);

	if (!session || !payload) {
		return null;
	}

	const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
	cookies().set('session', session, {
		httpOnly: true,
		secure: true,
		expires: expires,
		sameSite: 'lax',
		path: '/',
	});
}

export async function deleteSession() {
	cookies().delete('authToken');
}

export async function getCookie() {
	return cookies().get('authToken')?.value;
}
