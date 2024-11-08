'use client';
import { WishItemSchema } from '@/app/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import ToggleableHeart from '../Hearth';

export default function WishListItems({ items }: { items: WishItemSchema[] }) {
	return (
		<>
			{items &&
				items.length > 0 &&
				items.map((wishItem, idx) => {
					return <WishItem wishItem={wishItem} key={idx} />;
				})}
		</>
	);
}

function WishItem({ wishItem }: { wishItem: WishItemSchema }) {
	return (
		<div className='rounded-lg border border-gray-200 bg-white p-4 shadow-sm  md:p-6'>
			<div className='space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0'>
				<a href='#' className='shrink-0 md:order-1'>
					<Image
						width={400}
						height={400}
						className='max-h-28 max-w-28'
						src='https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg'
						alt='imac image'
					/>
				</a>

				<div className='w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md'>
					<Link
						href={`products/${wishItem.product.id}`}
						className='text-base font-medium text-gray-900 hover:underline '
					>
						{wishItem.product.name}
					</Link>
					<p className='text-sm font-normal text-gray-700 '>
						{wishItem.product.description.split('.')[0]}
					</p>
					<p className='text-sm font-normal text-gray-700 '>
						${wishItem.product.price}
					</p>

					<div className='flex items-center gap-4 justify-end'>
						<ToggleableHeart size={32} wishItemId={wishItem.product.id} />
					</div>
				</div>
			</div>
		</div>
	);
}
