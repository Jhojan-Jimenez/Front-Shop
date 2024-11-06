'use client';
import { useCart } from '@/app/context/CartContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function OrderSummary() {
	const { total, couponCode } = useCart();
	const [finalTotal, setFinalTotal] = useState(0);

	useEffect(() => {
		const discount = Number(couponCode?.discount_price) || 0;
		setFinalTotal(Number(total()) - discount + Number(total()) * 0.19);
	}, [total, couponCode]);

	return (
		<div className='space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm  sm:p-6'>
			<p className='text-xl font-semibold text-gray-900 '>Order summary</p>

			<div className='space-y-4'>
				<div className='space-y-2'>
					<dl className='flex items-center justify-between gap-4'>
						<dt className='text-base font-normal text-gray-500 '>
							Original price
						</dt>
						<dd className='text-base font-medium text-gray-900 '>${total()}</dd>
					</dl>

					<dl className='flex items-center justify-between gap-4'>
						<dt className='text-base font-normal text-gray-500 '>Savings</dt>
						<dd className='text-base font-medium text-green-600'>
							${couponCode?.discount_price}
						</dd>
					</dl>

					<dl className='flex items-center justify-between gap-4'>
						<dt className='text-base font-normal text-gray-500 '>
							Store Pickup
						</dt>
						<dd className='text-base font-medium text-gray-900 '>$0</dd>
					</dl>

					<dl className='flex items-center justify-between gap-4'>
						<dt className='text-base font-normal text-gray-500 '>Tax (19%)</dt>
						<dd className='text-base font-medium text-gray-900 '>
							${finalTotal * 0.19}
						</dd>
					</dl>
				</div>

				<dl className='flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700'>
					<dt className='text-base font-bold text-gray-900 '>Total</dt>
					<dd className='text-base font-bold text-gray-900 '>${finalTotal}</dd>
				</dl>
			</div>

			<Link
				href='/shopping/checkout'
				className='flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 '
			>
				Proceed to Checkout
			</Link>

			<div className='flex items-center justify-center gap-2'>
				<span className='text-sm font-normal text-gray-500 '> or </span>
				<Link
					href='/products'
					title=''
					className='inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline '
				>
					Continue Shopping
					<svg
						className='h-5 w-5'
						aria-hidden='true'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
					>
						<path
							stroke='currentColor'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M19 12H5m14 0-4 4m4-4-4-4'
						/>
					</svg>
				</Link>
			</div>
		</div>
	);
}
