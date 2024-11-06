'use client';

import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { getOrders } from '@/app/lib/actions/orders';
import { OrderSchema } from '@/app/lib/types';
import OrderItems from '@/app/ui/shoppingCar/orders/OrderItems';
import { StylizedDateDisplay } from '@/app/ui/Date';
import OrderStatus from '@/app/ui/shoppingCar/orders/OrderStatus';

export default function Page() {
	const [orders, setOrders] = useState([]);
	useEffect(() => {
		const fetchOrders = async () => {
			const orders = await getOrders();
			setOrders(orders);
		};
		fetchOrders();
	}, []);
	return (
		<>
			{orders.map((order: OrderSchema, index: number) => {
				return (
					<Disclosure as='div' className='border-t border-gray-200' key={index}>
						{({ open }) => (
							<>
								<h3 className='flow-root'>
									<Disclosure.Button className='px-2 py-6 bg-white w-full flex items-center justify-between text-black hover:bg-slate-100'>
										<div className='flex items-center w-full justify-between'>
											Order ID: {order.transaction_id}
											<StylizedDateDisplay dateString={order.date_issued} />
											<OrderStatus orderStatus={order.status} />
										</div>
										<span className='ml-6 mr-6 flex items-center'>
											{open ? (
												<MinusIcon className='h-5 w-5' aria-hidden='true' />
											) : (
												<PlusIcon className='h-5 w-5' aria-hidden='true' />
											)}
										</span>
									</Disclosure.Button>
								</h3>
								<Disclosure.Panel className='pt-6'>
									<OrderItems order={order} />
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>
				);
			})}
		</>
	);
}
