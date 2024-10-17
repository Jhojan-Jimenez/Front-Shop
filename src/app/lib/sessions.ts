'use server';
import axios, { AxiosResponse } from 'axios';
import { cookies } from 'next/headers';
import 'server-only';

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
	const res: AxiosResponse = await api.post('auth/jwt/create/', body, config);
	return res.data;
}
export async function verifyToken(token: string) {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const body = JSON.stringify({ token });
	try {
		await api.post('auth/jwt/verify/', body, config);
	} catch (error: any) {
		if (error.response.status === 401) {
			deleteSession();
			throw new Error('InvalidToken');
		}
	}
}
export async function refreshAuthToken() {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const refresh = await getRefresh();
	const body = JSON.stringify({ refresh });
	const res = await api.post('auth/jwt/refresh/', body, config);
	cookies().set('authToken', res.data.access, {
		httpOnly: true,
		secure: true,
		expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
		sameSite: 'lax',
		path: '/',
	});
}

export async function decrypt(sessionToken: string | undefined = '') {
	const config = {
		headers: {
			Authorization: 'JWT ' + sessionToken,
		},
	};
	const res: AxiosResponse = await api.get('auth/users/me/', config);
	return res.data;
}

export async function createSession(userEmail: string, userPassword: string) {
	const { refresh, access } = await encrypt(userEmail, userPassword);

	cookies().set('authToken', access, {
		httpOnly: true,
		secure: true,
		expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
		sameSite: 'lax',
		path: '/',
	});
	cookies().set('refreshToken', refresh, {
		httpOnly: true,
		secure: true,
		expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
		sameSite: 'lax',
		path: '/',
	});
}
export async function activateUser(uid: string, token: string) {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const body = JSON.stringify({ uid: uid, token: token });
	try {
		await api.post('auth/users/activation/', body, config);
	} catch (error: any) {
		if (error.response.status === 403) {
			throw new Error('UserAlreadyIsActivate');
		} else if (error.response.status === 400) {
			throw new Error('InvalidCredentials');
		}
	}
}

export async function deleteSession() {
	cookies().delete('authToken');
}
export async function deleteRefresh() {
	cookies().delete('refreshToken');
}

export async function getToken() {
	const authToken = cookies().get('authToken')?.value;
	await verifyToken(authToken || '');
	return authToken;
}
export async function getRefresh() {
	const refreshToken = cookies().get('refreshToken')?.value;
	await verifyToken(refreshToken || '');
	return refreshToken;
}
