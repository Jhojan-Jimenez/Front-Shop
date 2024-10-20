'use client';
import { Disclosure } from '@headlessui/react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

interface FilterOption {
	value: string;
	label: string;
	checked: boolean;
}
interface Filter {
	id: string;
	param: string;
	name: string;
	options: FilterOption[];
}

function useCategoryFilter() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams);
			if (value) {
				params.set(name, value);
			} else {
				params.delete(name);
			}
			return params.toString();
		},
		[searchParams]
	);

	const handleRadioChange = (filterParam: string, filterValue: string) => {
		const currentFilter = searchParams.get(filterParam);
		const newQueryString = createQueryString(
			filterParam,
			currentFilter === filterValue ? '' : filterValue
		);
		router.push(`?${newQueryString}`, { scroll: false });
	};

	return {
		handleRadioChange,
		searchParams,
	};
}

// Reusable radio input component
function RadioInput({
	filterParam,
	filterOption,
	optionIdx,
	isMobile = false,
}: {
	filterParam: string;
	filterOption: FilterOption;
	optionIdx: number;
	isMobile: boolean;
}) {
	const { handleRadioChange, searchParams } = useCategoryFilter();

	return (
		<div className='flex items-center'>
			<input
				id={`filter-${isMobile ? 'mobile-' : ''}${filterOption.label}-${optionIdx}`}
				name={`${filterParam}[]`}
				type='radio'
				className='h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500'
				onChange={() => handleRadioChange(filterParam, filterOption.value)}
				checked={searchParams.get(filterParam) === filterOption.value}
			/>
			<label
				htmlFor={`filter-${isMobile ? 'mobile-' : ''}${filterOption.label}-${optionIdx}`}
				className={`ml-3 ${isMobile ? 'min-w-0 flex-1 text-gray-500' : 'text-sm text-gray-600'}`}
			>
				{filterOption.label}
			</label>
		</div>
	);
}

// filter component
export function OtherFilters({ filter }: { filter: Filter }) {
	return (
		<Disclosure as='div' className='border-b border-gray-200 py-6'>
			{({ open }) => (
				<>
					<h3 className='-my-3 flow-root'>
						<Disclosure.Button className='py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500'>
							<span className='font-medium text-gray-900'>{filter.name}</span>
							<span className='ml-6 flex items-center'>
								{open ? (
									<MinusIcon className='h-5 w-5' aria-hidden='true' />
								) : (
									<PlusIcon className='h-5 w-5' aria-hidden='true' />
								)}
							</span>
						</Disclosure.Button>
					</h3>
					<Disclosure.Panel className='pt-6'>
						<div className='space-y-4'>
							{filter.options &&
								filter.options.map((filterOp, optionIdx) => (
									<RadioInput
										key={optionIdx}
										filterParam={filter.param}
										filterOption={filterOp}
										optionIdx={optionIdx}
										isMobile={false}
									/>
								))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}

// MobileCategory component
export function MobileOtherFilters({ filter }: { filter: Filter }) {
	return (
		<Disclosure
			as='div'
			key={filter.id}
			className='border-t border-gray-200 px-4 py-6'
		>
			{({ open }) => (
				<>
					<h3 className='-mx-2 -my-3 flow-root'>
						<Disclosure.Button className='px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500'>
							<span className='font-medium text-gray-900'>{filter.name}</span>
							<span className='ml-6 flex items-center'>
								{open ? (
									<MinusIcon className='h-5 w-5' aria-hidden='true' />
								) : (
									<PlusIcon className='h-5 w-5' aria-hidden='true' />
								)}
							</span>
						</Disclosure.Button>
					</h3>
					<Disclosure.Panel className='pt-6'>
						<div className='space-y-6'>
							{filter.options &&
								filter.options.map((filterOp, optionIdx) => (
									<RadioInput
										key={optionIdx}
										filterParam={filter.param}
										filterOption={filterOp}
										optionIdx={optionIdx}
										isMobile={true}
									/>
								))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}
