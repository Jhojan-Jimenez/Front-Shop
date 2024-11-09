import { getOrderById } from '@/app/lib/actions/orders';
import { OrderItemSchema, OrderSchema, PaymentOrder } from '@/app/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import BillingInfo from './BillingInfo';
import BasicLoader from '../../BasicLoader';

export default function OrderItems({ order }: { order: OrderSchema }) {
	const [orderItems, setOrderItems] = useState<PaymentOrder | null>(null);
	useEffect(() => {
		const fetchOrders = async () => {
			const res = await getOrderById(order.transaction_id);
			setOrderItems(res);
		};
		fetchOrders();
	}, [order.transaction_id]);
	return (
		<>
			<section className='bg-white py-4 antialiased md:py-8'>
				<form className='mx-auto max-w-screen-xl px-4 2xl:px-0'>
					<div className='mx-auto max-w-3xl'>
						<h2 className='text-xl font-semibold text-gray-900  sm:text-2xl'>
							Order summary
						</h2>
						<div className='mt-2 space-y-4 border-b border-t border-gray-200 py-8  sm:mt-8'>
							{orderItems ? (
								<BillingInfo orderItems={orderItems} />
							) : (
								<BasicLoader />
							)}
						</div>

						<div className='mt-6 sm:mt-8'>
							<div className='relative overflow-x-auto border-b border-gray-200 '>
								<table className='w-full text-left font-medium text-gray-900  md:table-fixed'>
									<tbody className='divide-y divide-gray-200 '>
										{orderItems?.order_items.map(
											(item: OrderItemSchema, index: number) => {
												return (
													<tr key={index}>
														<td className='whitespace-nowrap py-4 md:w-[384px]'>
															<div className='flex items-center gap-4'>
																<a
																	href='#'
																	className='flex items-center aspect-square w-10 h-10 shrink-0'
																>
																	<Image
																		className='h-auto w-full max-h-full '
																		src='https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg'
																		alt='imac image'
																		width={400}
																		height={400}
																	/>
																</a>
																<p className='hover:underline'>{item.name}</p>
															</div>
														</td>

														<td className='p-4 text-base font-normal text-gray-900 '>
															x{item.count}
														</td>

														<td className='p-4 text-right text-base font-bold text-gray-900 '>
															${item.price}
														</td>
													</tr>
												);
											}
										)}
									</tbody>
								</table>
							</div>

							<div className='mt-4 space-y-6'>
								<div className='space-y-4'>
									<div className='space-y-2'>
										<dl className='flex items-center justify-between gap-4'>
											<dt className='text-gray-500 '>Shipping</dt>
											<dd className='text-base font-medium text-gray-900 '>
												{orderItems?.shipping_name} - $
												{orderItems?.shipping_price}
											</dd>
										</dl>
										<dl className='flex items-center justify-between gap-4'>
											<dt className='text-gray-500 '>Coupon Discount</dt>
											<dd className='text-base font-medium text-gray-900 '>
												${orderItems?.coupon_discount}
											</dd>
										</dl>
										<dl className='flex items-center justify-between gap-4'>
											<dt className='text-gray-500 '>Tax</dt>
											<dd className='text-base font-medium text-gray-900 '>
												$
												{orderItems &&
													Math.round(
														Math.abs(
															(orderItems?.amount -
																orderItems?.shipping_price) *
																(0.19 / 1.19)
														)
													)}
											</dd>
										</dl>
									</div>

									<dl className='flex items-center justify-between gap-4 border-t border-gray-200 pt-2 '>
										<dt className='text-lg font-bold text-gray-900 '>Amount</dt>
										<dd className='text-lg font-bold text-gray-900 '>
											${orderItems?.amount}
										</dd>
									</dl>
								</div>

								<div className='gap-4 sm:flex sm:items-center'>
									<Link
										href={'/products'}
										className='w-full rounded-lg  border border-gray-200 bg-white px-5  py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 '
									>
										Return to Shopping
									</Link>
								</div>
							</div>
						</div>
					</div>
				</form>
			</section>
		</>
	);
}
