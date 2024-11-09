import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	const token = request.cookies.get('authToken')?.value;
	const protectedRoutes = ['/shopping/checkout', '/shopping/orders', '/perfil'];
	if (
		protectedRoutes.some((route) =>
			request.nextUrl.pathname.startsWith(route)
		) &&
		!token
	) {
		return NextResponse.redirect(new URL('/shopping?user=nouser', request.url));
	}
}
