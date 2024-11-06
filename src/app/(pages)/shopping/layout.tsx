'use client';
import { CartProvider } from '@/app/context/CartContext';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Layout({ children }: { children: ReactNode }) {
	const pathname = usePathname();

	return (
		<CartProvider>
			<section className='bg-white py-8 antialiased md:py-16'>
				<ol className='items-center flex w-full max-w-2xl text-center text-sm font-medium sm:text-base mx-auto pb-8'>
					<Link
						href='/shopping'
						className={`after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b  ${pathname == '/shopping' ? 'after:border-black' : 'after:border-blue-700'}  sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10`}
					>
						<span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/']  sm:after:hidden text-blue-700">
							<svg
								className='me-2 h-4 w-4 sm:h-5 sm:w-5'
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
									d='M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
								/>
							</svg>
							Cart
						</span>
					</Link>

					<Link
						href='/shopping/checkout'
						className={`after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b ${pathname == '/shopping' ? 'after:border-black' : 'after:border-blue-700'}    sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10`}
					>
						<span
							className={`flex items-center after:mx-2 after:text-gray-200 after:content-['/']  sm:after:hidden ${pathname == '/shopping' ? 'text-black' : 'text-blue-700'} `}
						>
							<svg
								className='me-2 h-4 w-4 sm:h-5 sm:w-5'
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
									d='M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
								/>
							</svg>
							Checkout
						</span>
					</Link>
					<Link
						href='/shopping/orders'
						className={`after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10`}
					>
						<span
							className={`flex items-center after:mx-2 after:text-gray-200 after:content-['/']  sm:after:hidden ${pathname == '/shopping/orders' ? 'text-blue-700' : 'text-black'} `}
						>
							<svg
								className='me-2 h-4 w-4 sm:h-5 sm:w-5'
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
									d='M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
								/>
							</svg>
							Order Summary
						</span>
					</Link>
				</ol>
				{children}
			</section>
		</CartProvider>
	);
}
