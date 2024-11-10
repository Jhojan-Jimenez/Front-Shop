'use client';
import { Disclosure } from '@headlessui/react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';

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
			if (params.has('page')) {
				params.delete('page');
			}
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
				defaultChecked={searchParams.get(filterParam) === filterOption.value}
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

// function useDeleteParams(open: boolean, paramName: string) {
// 	const router = useRouter();
// 	const searchParams = useSearchParams();
// 	const params = new URLSearchParams(searchParams);
// 	if (!open) {
// 		params.delete(paramName);
// 		router.replace(`?${params.toString()}`, { scroll: false });
// 	}
// }

export function FilterComponent({
	filter,
	isMobile = false,
}: {
	filter: Filter;
	isMobile?: boolean;
}) {
	const containerClass = isMobile
		? 'border-t border-gray-200 px-4 py-6'
		: 'border-b border-gray-200 py-6';

	const titleClass = isMobile ? '-mx-2 -my-3 flow-root' : '-my-3 flow-root';

	const buttonClass = isMobile
		? 'px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500'
		: 'py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500';

	const panelClass = isMobile ? 'space-y-6' : 'space-y-4';

	function DeleteParams(open: boolean, paramName: string) {
		const router = useRouter();
		const searchParams = useSearchParams();

		useEffect(() => {
			const params = new URLSearchParams(searchParams);
			if (!open) {
				params.delete(paramName);
				router.replace(`?${params.toString()}`, { scroll: false });
			}
		}, [open, paramName, router, searchParams]);
	}

	return (
		<Disclosure as='div' className={containerClass}>
			{({ open }) => {
				if (isMobile) {
					DeleteParams(open, filter.param);
				}
				return (
					<>
						<h3 className={titleClass}>
							<Disclosure.Button className={buttonClass}>
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
							<div className={panelClass}>
								{filter.options &&
									filter.options.map((filterOp, optionIdx) => (
										<RadioInput
											key={optionIdx}
											filterParam={filter.param}
											filterOption={filterOp}
											optionIdx={optionIdx}
											isMobile={isMobile}
										/>
									))}
							</div>
						</Disclosure.Panel>
					</>
				);
			}}
		</Disclosure>
	);
}
