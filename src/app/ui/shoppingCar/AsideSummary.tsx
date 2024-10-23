import { totalCartItems, totalCartPrice } from '@/app/lib/actions/cart';
import CodeForm from './CodeForm';
import OrderSummary from './OrderSummary';

export default function AsideSummary() {
	return (
		<div className='mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full'>
			<OrderSummary  />

			<div className='space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm  sm:p-6'>
				<CodeForm />
			</div>
		</div>
	);
}
