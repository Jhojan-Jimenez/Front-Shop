'use client';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Page() {
	const { user } = useAuth();
	const router = useRouter();
	return (
		<>
			{user ? (
				<>
					<h1>Welcome to Protected Route {user.email}</h1>
				</>
			) : (
				<>
					<h1>Already you dont sign in</h1>
					<button onClick={() => router.push('/login')}>Sign in</button>
				</>
			)}
		</>
	);
}
