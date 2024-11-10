import { getProducts } from '@/app/lib/actions/product';
import { ProductSchema } from '@/app/lib/types';
import Image from 'next/image';
import Link from 'next/link';
export default async function BestSeller() {
	const products: ProductSchema[] = await getProducts({
		sortBy: 'sold',
		order: 'desc',
	});
	return (
		<div className='bg-white'>
			<div className='mx-auto py-16 px-4 sm:py-12 sm:px-6 lg:px-8'>
				<div className='sm:flex sm:items-baseline sm:justify-between'>
					<h2 className='text-2xl font-extrabold tracking-tight text-gray-900'>
						Our Favorites
					</h2>
					<Link
						href='/products?sortBy=sold&order=desc'
						className='hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block'
					>
						Browse all favorites<span aria-hidden='true'> &rarr;</span>
					</Link>
				</div>

				<div className='mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-y-0 sm:gap-x-6 lg:gap-x-8'>
					{products.map((product) => (
						<div key={product.id} className='group relative'>
							<div className='w-full h-96 rounded-lg overflow-hidden group-hover:opacity-75 sm:h-auto sm:aspect-w-2 sm:aspect-h-3'>
								<Image
									width={400}
									height={400}
									src={product.photo}
									alt={product.name + ' photo'}
									className='w-full h-full object-center object-cover'
								/>
							</div>
							<h3 className='mt-4 text-base font-semibold text-gray-900'>
								<Link href={`/products/${product.id}`}>
									<span className='absolute inset-0' />
									{product.name}
								</Link>
							</h3>
							<p className='mt-1 text-lg text-gray-700'>${product.price}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
