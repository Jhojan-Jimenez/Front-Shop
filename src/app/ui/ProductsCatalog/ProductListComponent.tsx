import { ProductSchema } from '@/app/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import StarRating from '../StarRating';
import ToggleableHeart from '../Hearth';

export default async function ProductListComponent({
	product,
}: {
	product: ProductSchema;
}) {
	return (
		<div className='rounded-lg border border-gray-200 bg-white p-6 shadow-sm '>
			<div className='h-56 w-full'>
				<Link href={`/products/${product.id}`}>
					<Image
						width={400}
						height={400}
						className='rounded-lg shadow-md mx-auto object-cover h-full w-full hover:opacity-75 transition duration-300 ease-in-out'
						src={product.photo}
						alt={product.name + ' photo'}
					/>
				</Link>
			</div>
			<div className='pt-6'>
				<div className='text-lg font-semibold leading-tight text-gray-900 hover:underline '>
					{product.name}
				</div>

				<div className='mt-2 flex items-center justify-around gap-2'>
					<div className='flex items-center'>
						<StarRating rating={product.rating} />
					</div>

					<p className='text-sm font-medium text-gray-900 '>{product.rating}</p>
				</div>

				<div className='mt-4 flex items-center justify-between gap-4'>
					<p className='text-2xl font-extrabold leading-tight text-gray-900 '>
						${product.price}
					</p>

					<ToggleableHeart size={32} wishItemId={product.id} />
				</div>
			</div>
		</div>
	);
}
