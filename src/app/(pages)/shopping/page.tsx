'use client';
import { ClearCartButton } from '@/app/ui/buttons/buttons';
import AsideSummary from '@/app/ui/shoppingCar/AsideSummary';
import CartItems from '@/app/ui/shoppingCar/CartItems';
import RecommendedProd from '@/app/ui/shoppingCar/RecommendedProd';

export default function page() {
	return (
		<div className='mx-auto max-w-screen-xl px-4 2xl:px-0'>
			<div className='flex flex-row justify-between'>
				<h2 className='text-xl font-semibold text-gray-900  sm:text-2xl'>
					Shopping Cart
				</h2>
				<ClearCartButton />
			</div>

			<div className='mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8'>
				<div className='mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl'>
					<div className='space-y-6'>
						<CartItems />
					</div>
					<div className='hidden xl:mt-8 xl:block'>
						<h3 className='text-2xl font-semibold text-gray-900 '>
							People also bought
						</h3>
						<div className='mt-6 grid grid-cols-3 gap-4 sm:mt-8'>
							<RecommendedProd />
						</div>
					</div>
				</div>

				<AsideSummary />
			</div>
		</div>
	);
}
