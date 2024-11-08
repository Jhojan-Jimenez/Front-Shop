'use client';
import { useCart } from '@/app/context/CartContext';
import { useEffect, useState } from 'react';
import CodeForm from '../CodeForm';
export default function Summary({
	action,
}: {
	// eslint-disable-next-line no-unused-vars
	action: (e?: React.BaseSyntheticEvent) => Promise<void>;
}) {
	const { total, couponCode } = useCart();
	const [finalTotal, setFinalTotal] = useState(0);

	useEffect(() => {
		const discount = Number(couponCode?.discount_price) || 0;
		setFinalTotal(Number(total()) - discount + Number(total()) * 0.19);
	}, [total, couponCode]);
	return (
		<div className='mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md'>
			<div className='flow-root'>
				<div className='-my-3 divide-y divide-gray-200 '>
					<dl className='flex items-center justify-between gap-4 py-3'>
						<dt className='text-base font-normal text-gray-500 '>Subtotal</dt>
						<dd className='text-base font-medium text-gray-900 '>${total()}</dd>
					</dl>

					<dl className='flex items-center justify-between gap-4 py-3'>
						<dt className='text-base font-normal text-gray-500 '>Savings</dt>
						<dd className='text-base font-medium text-green-500'>
							${couponCode?.discount_price || '0'}
						</dd>
					</dl>

					<dl className='flex items-center justify-between gap-4 py-3'>
						<dt className='text-base font-normal text-gray-500 '>
							Store Pickup
						</dt>
						<dd className='text-base font-medium text-gray-900 '>$0</dd>
					</dl>

					<dl className='flex items-center justify-between gap-4 py-3'>
						<dt className='text-base font-normal text-gray-500 '>Tax (19%)</dt>
						<dd className='text-base font-medium text-gray-900 '>
							${finalTotal * 0.19}
						</dd>
					</dl>

					<dl className='flex items-center justify-between gap-4 py-3'>
						<dt className='text-base font-bold text-gray-900 '>Total</dt>
						<dd className='text-base font-bold text-gray-900 '>
							${finalTotal}
						</dd>
					</dl>
				</div>
				<div className='my-8 space-y-2 rounded-lg border border-gray-200 bg-white p-2 shadow-sm  sm:p-4'>
					<CodeForm />
				</div>
			</div>

			<div className='space-y-3'>
				<button
					type='button'
					className='flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-black hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 '
					onClick={() => action()}
				>
					Proceed to Payment
				</button>
			</div>
		</div>
	);
}
