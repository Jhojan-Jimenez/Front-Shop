import { getCategories } from '@/app/lib/actions/category';
import { getProducts } from '@/app/lib/actions/product';
import { FilterOptions } from '@/app/lib/types';
import Index from '@/app/ui/ProductsCatalog/Filters/Index';
import ProductCatalog from '@/app/ui/ProductsCatalog/ProductCatalog';
import ProductList from '@/app/ui/ProductsCatalog/ProductList';
import { Suspense } from 'react';

export default async function page({
	searchParams,
}: {
	searchParams: FilterOptions;
}) {
	const categories = await getCategories();
	const products = await getProducts({ ...searchParams });
	return (
		<section className='bg-gray-50 py-8 antialiased md:py-12'>
			<div className='mx-auto max-w-screen-2xl px-4 2xl:px-0'>
				<Suspense fallback={<div>Cargando...</div>}>
					<ProductCatalog categories={categories}>
						<div className='mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4'>
							<ProductList products={products} />
						</div>
						<div className='w-full text-center'>
							<Index />
						</div>
					</ProductCatalog>
				</Suspense>
			</div>
		</section>
	);
}
