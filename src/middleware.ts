import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	const token = request.cookies.get('authToken')?.value;

	if (request.nextUrl.pathname.startsWith('/checkout') && !token) {
		return NextResponse.rewrite(new URL('/shopping?user=nouser', request.url));
	}
}
