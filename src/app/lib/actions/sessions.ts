'use server';

import axios, { AxiosResponse, isAxiosError } from 'axios';
import { cookies } from 'next/headers';
import 'server-only';
import { RegisterUser } from '../types';

const api = axios.create({
	baseURL: 'http://127.0.0.1:8000/',
	headers: {
		'Content-Type': 'application/json',
	},
});

export async function encrypt(email: string, password: string) {
	const body = JSON.stringify({ email, password });
	try {
		const res: AxiosResponse = await api.post('auth/jwt/create/', body);
		return res.data;
	} catch (error: any) {
		throw new Error('Error encrypting credentials');
	}
}

export async function verifyToken(token: string) {
	const body = JSON.stringify({ token });
	try {
		await api.post('auth/jwt/verify/', body);
	} catch (error: any) {
		if (error.response?.status === 401) {
			await deleteSession();
			throw new Error('InvalidToken');
		}
		throw new Error('Error verifying token');
	}
}

export async function refreshAuthToken() {
	const refresh = await getRefresh();
	const body = JSON.stringify({ refresh });
	try {
		const res: AxiosResponse = await api.post('auth/jwt/refresh/', body);
		cookies().set('authToken', res.data.access, {
			httpOnly: true,
			secure: true,
			expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 día
			sameSite: 'lax',
			path: '/',
		});
	} catch (error: any) {
		throw new Error('Error refreshing token');
	}
}

export async function decrypt(sessionToken: string | undefined = '') {
	const config = {
		headers: {
			Authorization: 'JWT ' + sessionToken,
		},
	};
	try {
		const res: AxiosResponse = await api.get('auth/users/me/', config);
		return res.data;
	} catch (error: any) {
		throw new Error('Error decrypting session token');
	}
}

export async function createSession(userEmail: string, userPassword: string) {
	try {
		const { refresh, access } = await encrypt(userEmail, userPassword);
		cookies().set('authToken', access, {
			httpOnly: true,
			secure: true,
			expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 día
			sameSite: 'lax',
			path: '/',
		});
		cookies().set('refreshToken', refresh, {
			httpOnly: true,
			secure: true,
			expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 días
			sameSite: 'lax',
			path: '/',
		});
		return access;
	} catch (error: any) {
		throw new Error('Error creating session');
	}
}

export async function activateUser(uid: string, token: string) {
	const body = JSON.stringify({ uid, token });
	try {
		await api.post('auth/users/activation/', body);
	} catch (error: any) {
		if (error.response?.status === 403) {
			throw new Error('UserAlreadyIsActivate');
		} else if (error.response?.status === 400) {
			throw new Error('InvalidCredentials');
		}
		throw new Error('Error activating user');
	}
}

export async function resetPassword(email: string) {
	const body = JSON.stringify({ email });
	try {
		await api.post('auth/users/reset_password/', body);
	} catch (error: any) {
		if (error.response?.status === 400) {
			throw new Error('DoesNotExistThisEmail');
		}
		throw new Error('Error resetting password');
	}
}

export async function resetPasswordConfirm(
	uid: string,
	token: string,
	newPassword: string,
	reNewPassword: string
) {
	const body = JSON.stringify({
		uid,
		token,
		new_password: newPassword,
		re_new_password: reNewPassword,
	});
	try {
		await api.post('auth/users/reset_password_confirm/', body);
	} catch (error: any) {
		if (error.response?.status === 400) {
			throw new Error('Invalid password reset request');
		}
		throw new Error('Error confirming password reset');
	}
}
export async function userSignup({
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
	try {
		await api.post('auth/users/', body, config);
	} catch (error) {
		if (isAxiosError(error) && error.response?.status === 400) {
			return error.response.data;
		}
	}
}

export async function deleteSession() {
	cookies().delete('authToken');
	cookies().delete('refreshToken');
}

export async function deleteRefresh() {
	cookies().delete('refreshToken');
}

export async function getToken() {
	const authToken = cookies().get('authToken')?.value;
	if (authToken) {
		await verifyToken(authToken);
	}
	return authToken;
}

export async function getRefresh() {
	const refreshToken = cookies().get('refreshToken')?.value;
	if (refreshToken) {
		await verifyToken(refreshToken);
	}
	return refreshToken;
}
