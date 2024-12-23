'use client';
import { useAuth } from '@/app/context/AuthContext';
import { Unk } from '@/app/lib/actions/AnonymUser';
import { getWishList } from '@/app/lib/actions/wishlist';
import { WishItemSchema } from '@/app/lib/types';
import WishListItems from '@/app/ui/wishlist/WishListItems';
import { useEffect, useState } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

export default function Page() {
	const [items, setItems] = useState<WishItemSchema[]>([]);
	const [loading, setLoading] = useState(true);
	const { user } = useAuth();

	useEffect(() => {
		async function fetchWishlist() {
			setLoading(true);
			const wishlistItems = user
				? await getWishList()
				: await Unk.getWishList();
			setItems(wishlistItems);
			setLoading(false);
		}
		fetchWishlist();
	}, [user]);

	return (
		<div className='mx-auto max-w-screen-xl px-4 2xl:px-0'>
			<div className='flex flex-row justify-between'>
				<h2 className='text-xl font-semibold text-gray-900 sm:text-2xl p-8'>
					Wishlist ({items.length || 0})
				</h2>
			</div>
			<div className='mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8'>
				<div className='mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl'>
					{loading ? (
						<div className='flex justify-center h-full items-center'>
							{' '}
							<BeatLoader />{' '}
						</div>
					) : (
						<div className='space-y-6 grid grid-cols-2'>
							{items && items.length > 0 ? (
								<WishListItems items={items} />
							) : (
								<p className='text-gray-700 font-semibold text-lg'>
									No items in your wishlist
								</p>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
