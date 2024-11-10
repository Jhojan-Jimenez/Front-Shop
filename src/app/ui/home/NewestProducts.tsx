import { getProducts } from '@/app/lib/actions/product';
import { ProductSchema } from '@/app/lib/types';
import Image from 'next/image';
import Link from 'next/link';

export default async function NewestProducts() {
	const products: ProductSchema[] = await getProducts({
		sortBy: 'sold',
		order: 'desc',
	});
	return (
		<div className='bg-white'>
			<div className=' mx-auto py-8 px-4 sm:py-16 sm:px-6 lg:px-8'>
				<h2 className='text-2xl font-extrabold tracking-tight text-gray-900'>
					NewestProducts
				</h2>
				<div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
					{products.map((product) => (
						<div key={product.id} className='group relative'>
							<div className='w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none'>
								<Image
									width={400}
									height={400}
									src={product.photo}
									alt={product.name + ' photo'}
									className='w-full h-full object-center object-cover lg:w-full lg:h-full z-0'
								/>
							</div>
							<div className='mt-4 flex justify-between'>
								<div>
									<h3 className='text-sm text-gray-700'>
										<Link href={`/products/${product.id}`}>
											<span aria-hidden='true' className='absolute inset-0' />
											{product.name}
										</Link>
									</h3>
								</div>
								<p className='text-sm font-medium text-gray-900'>
									${product.price}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
