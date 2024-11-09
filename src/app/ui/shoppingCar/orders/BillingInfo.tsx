import { PaymentOrder } from '@/app/lib/types';
import React from 'react';

export default function BillingInfo({
	orderItems,
}: {
	orderItems: PaymentOrder;
}) {
	return (
		<div className='bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto'>
			<h4 className='text-2xl font-semibold text-gray-900 mb-4 border-b pb-2'>
				Billing & Delivery Information
			</h4>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				<div className='space-y-2'>
					<p className='text-sm font-medium text-gray-500'>Customer</p>
					<p className='text-base font-semibold text-gray-900'>
						{orderItems.full_name}
					</p>
				</div>
				<div className='space-y-2'>
					<p className='text-sm font-medium text-gray-500'>Contact</p>
					<p className='text-base font-semibold text-gray-900'>
						{orderItems.telephone_number}
					</p>
				</div>
				<div className='space-y-2'>
					<p className='text-sm font-medium text-gray-500'>City</p>
					<p className='text-base font-semibold text-gray-900'>
						{orderItems.city}
					</p>
				</div>
				<div className='space-y-2'>
					<p className='text-sm font-medium text-gray-500'>State/Province</p>
					<p className='text-base font-semibold text-gray-900'>
						{orderItems.state_province_region}
					</p>
				</div>
				<div className='space-y-2'>
					<p className='text-sm font-medium text-gray-500'>Country</p>
					<p className='text-base font-semibold text-gray-900'>
						{orderItems.country_region}
					</p>
				</div>
				<div className='space-y-2'>
					<p className='text-sm font-medium text-gray-500'>Postal Code</p>
					<p className='text-base font-semibold text-gray-900'>
						{orderItems.postal_zip_code}
					</p>
				</div>
				<div className='col-span-1 md:col-span-2 space-y-2'>
					<p className='text-sm font-medium text-gray-500'>Address</p>
					<p className='text-base font-semibold text-gray-900'>
						{orderItems.address_line_1}
						{orderItems.address_line_2 && (
							<>
								<br />
								{orderItems.address_line_2}
							</>
						)}
					</p>
				</div>
			</div>
		</div>
	);
}
