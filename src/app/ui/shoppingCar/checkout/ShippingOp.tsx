import React, { useEffect, useState } from 'react';
import { getShippingOptions } from '@/app/lib/actions/shipping';

interface ShippingOp {
	id: number;
	name: string;
	time_to_delivery: number;
	price: number;
}

export default function ShippingOp({
	onSelect,
}: {
	onSelect: (id: number) => void;
}) {
	const [shippingOps, setOps] = useState<ShippingOp[]>([]);
	const [selectedOption, setSelectedOption] = useState<number | null>(1);

	useEffect(() => {
		const fetchOps = async () => {
			const ops = await getShippingOptions();
			setOps(ops);
		};
		fetchOps();
	}, []);

	const handleChange = (id: number) => {
		setSelectedOption(id);
		onSelect(id);
	};

	return (
		<>
			{shippingOps.map((op: ShippingOp) => (
				<div
					className='rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4'
					key={op.id}
				>
					<div className='flex items-start'>
						<div className='flex h-5 items-center'>
							<input
								id={`shipping-${op.id}`}
								type='radio'
								name='delivery-method'
								value={op.id}
								onChange={() => handleChange(op.id)}
								className='h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600'
								checked={selectedOption === op.id ? true : false}
							/>
						</div>
						<div className='ms-4 text-sm'>
							<label
								htmlFor={`shipping-${op.id}`}
								className='font-medium leading-none text-gray-900'
							>
								${op.price} - {op.name}
							</label>
							<p className='mt-1 text-xs font-normal text-gray-500'>
								{op.time_to_delivery} days
							</p>
						</div>
					</div>
				</div>
			))}
		</>
	);
}
