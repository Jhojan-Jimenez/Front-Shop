'use client';
import { SortOptionsSchema } from '@/app/lib/types';
import { Menu } from '@headlessui/react';
import { useRouter, useSearchParams } from 'next/navigation';

function classNames(
	...classes: (string | boolean | undefined | null)[]
): string {
	return classes.filter(Boolean).join(' ');
}
export default function SortOption({ option }: { option: SortOptionsSchema }) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const handleButtonClick = (typeSort: string, typeOrder: string) => {
		const params = new URLSearchParams(searchParams);

		const currentTypeSort = params.get('sortBy');
		if (currentTypeSort !== typeSort) {
			params.delete('sortBy');
			params.set('sortBy', typeSort);
		}
		const currentTypeOrder = params.get('order');
		if (currentTypeOrder !== typeOrder) {
			params.delete('order');
			params.set('order', typeOrder);
		}

		const newQueryString = params.toString();

		router.push(`?${newQueryString}`, { scroll: false });
	};
	return (
		<Menu.Item key={option.name}>
			{({ active }) => (
				<button
					className={classNames(
						option.current ? 'font-medium text-gray-900' : 'text-gray-500',
						active ? 'bg-gray-100' : '',
						'block px-4 py-2 text-sm'
					)}
					onClick={() => handleButtonClick(option.sortBy, option.order)}
				>
					{option.name}
				</button>
			)}
		</Menu.Item>
	);
}
