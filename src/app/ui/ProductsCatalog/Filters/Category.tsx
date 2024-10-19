import { CategorySchema } from '@/app/lib/types';
import { Disclosure } from '@headlessui/react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
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
							<span className='font-medium text-gray-900'>{category.name}</span>
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
									<div key={subCategory.id} className='flex items-center'>
										<input
											id={`filter-${subCategory.id}-${optionIdx}`}
											name={`${subCategory.id}[]`}
											type='checkbox'
											className='h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500'
										/>
										<label
											htmlFor={`filter-${subCategory.id}-${optionIdx}`}
											className='ml-3 text-sm text-gray-600'
										>
											{subCategory.name}
										</label>
									</div>
								))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}

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
							<span className='font-medium text-gray-900'>{category.name}</span>
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
									<div key={subCategory.id} className='flex items-center'>
										<input
											id={`filter-mobile-${subCategory.id}-${optionIdx}`}
											name={`${subCategory.id}[]`}
											className='h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500'
										/>
										<label
											htmlFor={`filter-mobile-${subCategory.id}-${optionIdx}`}
											className='ml-3 min-w-0 flex-1 text-gray-500'
										>
											{subCategory.name}
										</label>
									</div>
								))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}
