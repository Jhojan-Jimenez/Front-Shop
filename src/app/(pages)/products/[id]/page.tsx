import { getProductById } from '@/app/lib/actions/product';
import ProductDetailView from '@/app/ui/ProductsCatalog/ProductDetailView';
import { notFound } from 'next/navigation';

export default async function page({ params }: { params: { id: number } }) {
	const { id } = params;
	const product = await getProductById(id);
	if (!product) {
		notFound();
	}
	return (
		<section className='text-gray-600 body-font overflow-hidden'>
			<ProductDetailView product={product}  />
		</section>
	);
}
