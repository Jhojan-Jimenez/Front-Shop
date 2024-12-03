'use client';

import { Suspense, useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { getCategories } from '@/app/lib/actions/category';
import { getProducts } from '@/app/lib/actions/product';
import { CategorySchema, ProductSchema } from '@/app/lib/types';
import Index from '@/app/ui/ProductsCatalog/Filters/Index';
import ProductCatalog from '@/app/ui/ProductsCatalog/ProductCatalog';
import ProductList from '@/app/ui/ProductsCatalog/ProductList';
import BeatLoader from 'react-spinners/BeatLoader';
export const dynamic = 'force-dynamic';

export default function Page() {
	const [categories, setCategories] = useState<[CategorySchema] | []>([]);
	const [products, setProducts] = useState<[ProductSchema] | []>([]);
	const [loading, setLoading] = useState(true);

	// Obtener los parámetros de búsqueda desde la URL
	const searchParams = useSearchParams();

	// Memorizar filters para evitar referencias nuevas
	const filters = useMemo(
		() => Object.fromEntries(searchParams.entries()),
		[searchParams]
	);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const categoriesData = await getCategories();
				console.log('Filters:', filters);

				const productsData = await getProducts(filters);
				console.log(productsData);

				setCategories(categoriesData);
				setProducts(productsData);
			} catch (error) {
				console.error('Error fetching data:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [filters]); // Ahora el efecto solo se ejecutará si los valores en `filters` cambian

	return (
		<section className='bg-gray-50 py-8 antialiased md:py-12'>
			<div className='mx-auto max-w-screen-2xl px-4 2xl:px-0'>
				{/* Suspense envuelto alrededor del componente que depende de la navegación */}
				<Suspense
					fallback={
						<div className='flex justify-center h-full items-center'>
							<BeatLoader />
						</div>
					}
				>
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
							<Index
								totalItems={Array.isArray(products) ? products.length : 0}
							/>
						</div>
					</ProductCatalog>
				</Suspense>
			</div>
		</section>
	);
}
