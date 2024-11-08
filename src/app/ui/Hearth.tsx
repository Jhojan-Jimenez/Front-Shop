'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import {
	addWishListItem,
	haveWishListItem,
	removeWishListItem,
} from '../lib/actions/wishlist';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { Unk } from '../lib/actions/AnonymUser';

interface ToggleableHeartProps {
	wishItemId: number;
	size?: number;
}

export default function ToggleableHeart({
	wishItemId,
	size = 24,
}: ToggleableHeartProps) {
	const [isFilled, setIsFilled] = useState(false);
	const { user } = useAuth();

	useEffect(() => {
		const fetchInitialState = async () => {
			const isInWishlist = user
				? await haveWishListItem(wishItemId)
				: Unk.haveWhishListItem(wishItemId);
			setIsFilled(isInWishlist);
		};
		fetchInitialState();
	}, [wishItemId, user]);

	const handleClick = async () => {
		const newState = !isFilled;
		try {
			if (newState) {
				// eslint-disable-next-line @typescript-eslint/no-unused-expressions
				user
					? await addWishListItem(wishItemId)
					: Unk.addWhishListItem(wishItemId);
				toast.success('Product successfully added to your wishlist', {
					position: 'bottom-right',
				});
			} else {
				// eslint-disable-next-line @typescript-eslint/no-unused-expressions
				user
					? await removeWishListItem(wishItemId)
					: Unk.removeWhishListItem(wishItemId);
				toast.success('Product successfully removed from your wishlist', {
					position: 'bottom-right',
				});
			}
		} catch {
			toast.error('An error occurred');
		}
		setIsFilled(newState);
	};

	return (
		<button
			onClick={handleClick}
			className={`transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full p-1
        ${isFilled ? 'text-red-500 hover:text-red-600 focus:ring-red-500' : 'text-gray-400 hover:text-gray-500'}`}
			aria-label={isFilled ? 'Remove from favorites' : 'Add to favorites'}
		>
			<Heart
				size={size}
				className={`${isFilled ? 'fill-current' : ''} transition-transform duration-300 ease-in-out transform hover:scale-110`}
			/>
		</button>
	);
}
