import { getProductById } from '@/app/lib/actions/product';
import ProductDetailFall from '@/app/ui/fallBacks/ProductDetailFall';
import ProductDetailView from '@/app/ui/ProductsCatalog/ProductDetailView';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export default async function page({ params }: { params: { id: number } }) {
	const { id } = params;
	const product = await getProductById(id);
	if (!product) {
		notFound();
	}
	return (
		<section className='text-gray-600 body-font overflow-hidden'>
			<Suspense fallback={<ProductDetailFall />}>
				<ProductDetailView product={product} />
			</Suspense>
		</section>
	);
}
