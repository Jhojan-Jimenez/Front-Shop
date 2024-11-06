import { FormEvent, useState } from 'react';
import { existCoupon } from '@/app/lib/actions/coupons';
import toast from 'react-hot-toast';
import { useCart } from '@/app/context/CartContext';

export default function CodeForm() {
	const { setCouponCode } = useCart();
	const [couponInfo, setCouponInfo] = useState('');
	const [inputCouponCode, setinputCouponCode] = useState('');
	const [loading, setLoading] = useState(false);

	const verifyCoupon = async (e: FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setCouponInfo('');

		try {
			const res = await existCoupon(inputCouponCode);

			setCouponInfo('Correct name');
			setCouponCode(res.coupon);
		} catch (error) {
			setCouponCode(null);
			if ((error as Error).message === 'NotFoundCoupon') {
				setCouponInfo('Does not exist a coupon with this name');
			} else {
				toast.error('Server error');
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<form className='space-y-4' onSubmit={verifyCoupon}>
			<div>
				<label
					htmlFor='voucher'
					className='mb-2 block text-sm font-medium text-gray-900'
				>
					Do you have a coupon?
				</label>
				<input
					type='text'
					id='voucher'
					value={inputCouponCode}
					onChange={(e) => setinputCouponCode(e.target.value)}
					className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500'
					placeholder=''
					disabled={loading}
				/>
				{couponInfo && (
					<span
						className={
							couponInfo === 'Correct name' ? 'text-green-500' : 'text-red-500'
						}
					>
						{couponInfo}
					</span>
				)}
			</div>
			<button
				type='submit'
				className='flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-gray-800 hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300'
				disabled={loading}
			>
				{loading ? 'Verifying...' : 'Apply Code'}
			</button>
		</form>
	);
}
