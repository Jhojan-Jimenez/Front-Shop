'use client';

import { useEffect, useState } from 'react';
import { getCategories } from '@/app/lib/actions/category';
import { getProducts } from '@/app/lib/actions/product';
import { CategorySchema, FilterOptions, ProductSchema } from '@/app/lib/types';
import Index from '@/app/ui/ProductsCatalog/Filters/Index';
import ProductCatalog from '@/app/ui/ProductsCatalog/ProductCatalog';
import ProductList from '@/app/ui/ProductsCatalog/ProductList';
import BeatLoader from 'react-spinners/BeatLoader';

export default function Page({
	searchParams,
}: {
	searchParams: FilterOptions;
}) {
	const [categories, setCategories] = useState<[CategorySchema] | []>([]);
	const [products, setProducts] = useState<[ProductSchema] | []>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const categoriesData = await getCategories();
				const productsData = await getProducts({ ...searchParams });

				setCategories(categoriesData);
				setProducts(productsData);
			} catch (error) {
				console.error('Error fetching data:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [searchParams]);

	return (
		<section className='bg-gray-50 py-8 antialiased md:py-12'>
			<div className='mx-auto max-w-screen-2xl px-4 2xl:px-0'>
				<ProductCatalog categories={categories}>
					{loading ? (
						<div className='flex justify-center h-full items-center'>
							{' '}
							<BeatLoader />{' '}
						</div>
					) : (
						<div className='mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4'>
							<ProductList products={products} />
						</div>
					)}
					<div className='w-full text-center'>
						<Index totalItems={products.length} />
					</div>
				</ProductCatalog>
			</div>
		</section>
	);
}
