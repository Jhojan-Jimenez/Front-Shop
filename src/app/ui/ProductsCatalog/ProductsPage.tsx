'use client';

import { getCategories } from '@/app/lib/actions/category';
import { getProducts } from '@/app/lib/actions/product';
import { CategorySchema, ProductSchema } from '@/app/lib/types';
import Index from '@/app/ui/ProductsCatalog/Filters/Index';
import ProductCatalog from '@/app/ui/ProductsCatalog/ProductCatalog';
import ProductList from '@/app/ui/ProductsCatalog/ProductList';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

export default function ProductsPage() {
	const searchParams = useSearchParams();

	const filters = useMemo(
		() => Object.fromEntries(searchParams.entries()),
		[searchParams]
	);
	const [categories, setCategories] = useState<[CategorySchema] | []>([]);
	const [products, setProducts] = useState<[ProductSchema] | []>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const categoriesData = await getCategories();
				const productsData = await getProducts(filters);

				setCategories(categoriesData);
				setProducts(productsData);
			} catch (error) {
				console.error('Error fetching data:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [filters]);

	return (
		<ProductCatalog categories={categories}>
			{loading ? (
				<div className='flex justify-center h-full items-center'>
					<BeatLoader />
				</div>
			) : (
				<div className='mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4'>
					<ProductList products={products} />
				</div>
			)}
			<div className='w-full text-center'>
				<Index totalItems={Array.isArray(products) ? products.length : 0} />
			</div>
		</ProductCatalog>
	);
}
