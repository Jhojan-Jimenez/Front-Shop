import Filters from '@/app/ui/productDash/Filters';
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
					<button
						type='button'
						className='rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700'
					>
						Show more
					</button>
				</div>
			</div>
		</section>
	);
}
