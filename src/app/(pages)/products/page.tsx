import Filters from '@/app/ui/productDash/Filters';
import Index from '@/app/ui/productDash/Index';
import Product from '@/app/ui/productDash/Product';

export default function page() {
	return (
		<section className='bg-gray-50 py-8 antialiased md:py-12'>
			<div className='mx-auto max-w-screen-xl px-4 2xl:px-0'>
				<Filters />
				<div className='mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4'>
					<Product />
					<Product />
					<Product />
					<Product />
				</div>
				<div className='w-full text-center'>
					<Index />
				</div>
			</div>
		</section>
	);
}
