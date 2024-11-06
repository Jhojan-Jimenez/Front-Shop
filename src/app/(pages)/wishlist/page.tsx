'use server';
import { getWishList } from '@/app/lib/actions/wishlist';
import { WishItemSchema } from '@/app/lib/types';
import WishListItems from '@/app/ui/wishlist/WishListItems';

export default async function page() {
	const items: [WishItemSchema] = await getWishList();
	return (
		<div className='mx-auto max-w-screen-xl px-4 2xl:px-0'>
			<div className='flex flex-row justify-between'>
				<h2 className='text-xl font-semibold text-gray-900  sm:text-2xl p-8'>
					Wishlist
				</h2>
			</div>
			<div className='mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8'>
				<div className='mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl'>
					<div className='space-y-6'>
						<WishListItems items={items} />
					</div>
				</div>
			</div>
		</div>
	);
}
