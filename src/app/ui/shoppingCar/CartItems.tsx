'use client';
import { useAuth } from '@/app/context/AuthContext';
import { useCart } from '@/app/context/CartContext';
import { useLoading } from '@/app/context/LoadingContext';
import { Unk } from '@/app/lib/actions/AnonymUser';
import { removeCartItem, updateItemCount } from '@/app/lib/actions/cart';
import { CartItemSchema } from '@/app/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import ToggleableHeart from '../Hearth';

export default function CartItems() {
	const { userCartItems } = useCart();
	return (
		<>
			{userCartItems.length > 0 ? (
				userCartItems.map((cartItem, idx) => {
					return <CartItem cartItem={cartItem} key={idx} />;
				})
			) : (
				<p className='text-gray-700 font-semibold text-lg'>
					There are not items in your Cart
				</p>
			)}
		</>
	);
}

function CartItem({ cartItem }: { cartItem: CartItemSchema }) {
	const { setLoading } = useLoading();
	const { user } = useAuth();
	const { userCartItems, SetCartItems } = useCart();
	const [amount, setAmount] = useState(cartItem.count);
	const deleteCartItem = async () => {
		setLoading(true);
		try {
			const res = user
				? await removeCartItem(cartItem.product.id)
				: Unk.removeCartItem(cartItem.product.id);
			SetCartItems(res);
			if (res) {
				return toast.success('Product successfully removed from your cart');
			}
		} catch (error: unknown) {
			return toast.error((error as Error).message);
		} finally {
			setLoading(false);
		}
	};
	const handleAmount = async (num: number) => {
		const newAmount = amount + num;
		try {
			await updateItemCount(cartItem.product.id, newAmount);
		} catch (error) {
			if ((error as Error).message === 'Outstock') {
				return toast.error('Not enough of this item in stock');
			}
			return toast.error('Server error');
		}
		setAmount(newAmount);
		const updatedCartItems = userCartItems.map((item) =>
			item.id === cartItem.id ? { ...item, count: newAmount } : item
		);
		SetCartItems(updatedCartItems);
		return;
	};
	return (
		<div className='rounded-lg border border-gray-200 bg-white p-4 shadow-sm  md:p-6'>
			<div className='space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0'>
				<Link
					href={`products/${cartItem.product.id}`}
					className='shrink-0 md:order-1'
				>
					<Image
						width={400}
						height={400}
						className='rounded-lg shadow-md object-cover h-auto hover:opacity-75 transition duration-300 ease-in-out max-w-32'
						src={cartItem.product.photo}
						alt={cartItem.product.name + ' photo'}
					/>
				</Link>

				<label htmlFor='counter-input' className='sr-only'>
					Choose quantity:
				</label>
				<div className='flex items-center justify-between md:order-3 md:justify-end'>
					<div className='flex items-center'>
						<button
							type='button'
							id='decrement-button'
							className={
								'inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100  '
							}
							onClick={() => handleAmount(-1)}
							disabled={amount === 1}
						>
							<svg
								className='h-2.5 w-2.5 text-gray-900 dark:text-white'
								aria-hidden='true'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 18 2'
							>
								<path
									stroke='currentColor'
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M1 1h16'
								/>
							</svg>
						</button>
						<div
							id='counter-input'
							className='w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 '
						>
							{amount}
						</div>
						<button
							type='button'
							id='increment-button'
							data-input-counter-increment='counter-input'
							className='inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 '
							onClick={() => handleAmount(+1)}
						>
							<svg
								className='h-2.5 w-2.5 text-gray-900 '
								aria-hidden='true'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 18 18'
							>
								<path
									stroke='currentColor'
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M9 1v16M1 9h16'
								/>
							</svg>
						</button>
					</div>
					<div className='text-end md:order-4 md:w-32'>
						<p className='text-base font-bold text-gray-900 '>
							${cartItem.product.price * amount}
						</p>
					</div>
				</div>

				<div className='w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md'>
					<p className='text-base font-medium text-gray-900 '>
						{cartItem.product.description.split('.')[0]}
					</p>

					<div className='flex items-center justify-between gap-4'>
						<div onClick={deleteCartItem}>
							<ToggleableHeart size={32} wishItemId={cartItem.product.id} />
						</div>

						<button
							type='button'
							className='inline-flex items-center text-lg font-medium text-red-600 hover:underline pl-10'
							onClick={deleteCartItem}
						>
							<svg
								className='me-1.5 h-5 w-5'
								aria-hidden='true'
								xmlns='http://www.w3.org/2000/svg'
								width='24'
								height='24'
								fill='none'
								viewBox='0 0 24 24'
							>
								<path
									stroke='currentColor'
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M6 18 17.94 6M18 18 6.06 6'
								/>
							</svg>
							Remove
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
