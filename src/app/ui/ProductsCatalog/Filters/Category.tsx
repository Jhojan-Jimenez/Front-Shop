'use client';
import { CategorySchema, SubCategorySchema } from '@/app/lib/types';
import { Disclosure } from '@headlessui/react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

// Custom hook for shared logic
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

	const handleRadioChange = (subCategoryId: string) => {
		const currentCategoryId = searchParams.get('categoryId');
		const newQueryString = createQueryString(
			'categoryId',
			currentCategoryId === subCategoryId ? '' : subCategoryId
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
	subCategory,
	optionIdx,
	isMobile = false,
}: {
	subCategory: SubCategorySchema;
	optionIdx: number;
	isMobile: boolean;
}) {
	const { handleRadioChange, searchParams } = useCategoryFilter();

	return (
		<div className='flex items-center'>
			<input
				id={`filter-${isMobile ? 'mobile-' : ''}${subCategory.id}-${optionIdx}`}
				name={`${subCategory.id}[]`}
				type='radio'
				className='h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500'
				onChange={() => handleRadioChange(subCategory.id.toString())}
				checked={searchParams.get('categoryId') === subCategory.id.toString()}
			/>
			<label
				htmlFor={`filter-${isMobile ? 'mobile-' : ''}${subCategory.id}-${optionIdx}`}
				className={`ml-3 ${isMobile ? 'min-w-0 flex-1 text-gray-500' : 'text-sm text-gray-600'}`}
			>
				{subCategory.name}
			</label>
		</div>
	);
}

// Category component
export function Category({ category }: { category: CategorySchema }) {
	return (
		<Disclosure
			as='div'
			key={category.id}
			className='border-b border-gray-200 py-6'
		>
			{({ open }) => (
				<>
					<h3 className='-my-3 flow-root'>
						<Disclosure.Button className='py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500'>
							<RadioInput
								key={category.id}
								subCategory={{ id: category.id, name: category.name }}
								optionIdx={0}
								isMobile={false}
							/>
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
							{category.sub_categories &&
								category.sub_categories.map((subCategory, optionIdx) => (
									<RadioInput
										key={subCategory.id}
										subCategory={subCategory}
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
export function MobileCategory({ category }: { category: CategorySchema }) {
	return (
		<Disclosure
			as='div'
			key={category.id}
			className='border-t border-gray-200 px-4 py-6'
		>
			{({ open }) => (
				<>
					<h3 className='-mx-2 -my-3 flow-root'>
						<Disclosure.Button className='px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500'>
							<RadioInput
								key={category.id}
								subCategory={{ id: category.id, name: category.name }}
								optionIdx={0}
								isMobile={true}
							/>
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
							{category.sub_categories &&
								category.sub_categories.map((subCategory, optionIdx) => (
									<RadioInput
										key={subCategory.id}
										subCategory={subCategory}
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
