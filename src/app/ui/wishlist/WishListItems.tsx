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
			<div className='space-y-4  xl:flex xl:items-center xl:justify-between xl:space-y-0'>
				<Link href={`products/${wishItem.product.id}`} className='w-1/2'>
					<Image
						width={400}
						height={400}
						className='rounded-lg shadow-md object-cover h-auto hover:opacity-75 transition duration-300 ease-in-out w-full'
						src={wishItem.product.photo}
						alt={wishItem.product.name + ' photo'}
					/>
				</Link>

				<div className='w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md pl-4'>
					<Link
						href={`products/${wishItem.product.id}`}
						className='text-lg font-semibold text-gray-900 hover:text-blue-600 hover:underline transition duration-300 ease-in-out'
					>
						{wishItem.product.name}
					</Link>
					<p className='text-sm font-normal text-gray-700 mt-1'>
						{wishItem.product.description.split('.')[0]}
					</p>
					<div className='text-lg font-semibold text-gray-900 mt-2'>
						<div className='flex justify-between items-center'>
							${wishItem.product.price}
							<ToggleableHeart size={32} wishItemId={wishItem.id} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
