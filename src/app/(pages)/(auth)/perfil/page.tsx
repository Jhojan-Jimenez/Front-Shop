'use client';
import AuthContext from '@/app/context/AuthContext';
import { useContext } from 'react';

export default function Page() {
	const { user } = useContext(AuthContext);

	return (
		user && (
			<div>
				<h2>{user.email}</h2>
			</div>
		)
	);
}
