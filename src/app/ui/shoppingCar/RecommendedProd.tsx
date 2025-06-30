'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getProducts } from '@/app/lib/actions/product';
import { ProductSchema } from '@/app/lib/types';

export default function RecommendedProd() {
	const [products, setProducts] = useState<ProductSchema[]>([]);
	const [loading, setLoading] = useState(true);

	const router = useRouter();

	useEffect(() => {
		async function fetchProducts() {
			try {
				const res = await getProducts({});
				if (res) {
					const random3 = res.sort(() => 0.5 - Math.random()).slice(0, 3);
					setProducts(random3);
				}
			} catch (error) {
				console.error('Error fetching products', error);
			} finally {
				setLoading(false);
			}
		}

		fetchProducts();
	}, []);

	if (loading) {
		return (
			<div className='col-span-3 text-center text-gray-500'>
				Loading recommendations...
			</div>
		);
	}

	if (!products || products.length === 0) {
		return (
			<div className='col-span-3 text-center text-gray-500'>
				No recommended products found.
			</div>
		);
	}

	return (
		<>
			{products.map((product) => (
				<div
					key={product.id}
					className='space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm cursor-pointer hover:shadow-md transition'
					onClick={() => router.push(`/products/${product.id}`)}
				>
					<Image
						width={400}
						height={400}
						className='mx-auto h-44 w-44 object-cover'
						src={product.photo}
						alt={product.name}
					/>

					<div>
						<p className='text-lg font-semibold leading-tight text-gray-900 hover:underline'>
							{product.name}
						</p>
					</div>

					<div>
						{product.compare_price && product.compare_price > product.price ? (
							<p className='text-lg font-bold text-gray-900'>
								<span className='line-through'>${product.compare_price}</span>
							</p>
						) : null}
						<p className='text-lg font-bold leading-tight text-red-600'>
							${product.price}
						</p>
					</div>
				</div>
			))}
		</>
	);
}
