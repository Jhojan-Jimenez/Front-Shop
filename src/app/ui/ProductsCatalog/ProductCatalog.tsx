'use client';
import { CategorySchema, SortOptionsSchema } from '@/app/lib/types';
import { Dialog, Menu, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/24/solid';
import { Fragment, ReactNode, useState } from 'react';
import { Category, MobileCategory } from './Filters/Category';
import {
	FilterComponent,
	MobileOtherFilters,
	OtherFilters,
} from './Filters/OtherFilters';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import SortOption from './Filters/SortOption';
import SearchInput from './Filters/SearchInput';
import { Disclosure } from '@headlessui/react';
const sortOptions: SortOptionsSchema[] = [
	{ name: 'Most Popular', sortBy: 'sold', order: 'desc', current: true },
	{ name: 'Best Rating', sortBy: 'rating', order: 'desc', current: false },
	{ name: 'Newest', sortBy: 'date_created', order: 'desc', current: false },
	{
		name: 'Price: Low to High',
		sortBy: 'price',
		order: 'asc',
		current: false,
	},
	{
		name: 'Price: High to Low',
		sortBy: 'price',
		order: 'desc',
		current: false,
	},
];
const filters = [
	{
		id: 'Price Range',
		name: 'Price Range',
		param: 'priceRange',
		options: [
			{ value: '10000 - 20000', label: '10.000 - 20.000', checked: false },
			{ value: '20000 - 40000', label: '20.000 - 40.000', checked: false },
			{ value: '40000 - 60000', label: '40.000 - 60.000', checked: false },

			{ value: '60000 - 80000', label: '60.000 - 80.000', checked: false },
			{ value: 'More than 80000', label: 'More than 80.000', checked: false },
		],
	},
];

export default function ProductCatalog({
	children,
	categories,
}: {
	children: ReactNode;
	categories: [CategorySchema];
}) {
	const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

	return (
		<div className='bg-white'>
			<div>
				<>
					{/* Overlay */}
					<Transition
						show={mobileFiltersOpen}
						as={Fragment}
						enter='transition-opacity ease-linear duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='transition-opacity ease-linear duration-300'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<div
							className='fixed inset-0 bg-black bg-opacity-25 z-40'
							aria-hidden='true'
							onClick={() => setMobileFiltersOpen(false)}
						/>
					</Transition>

					{/* Dialog */}
					<Transition show={mobileFiltersOpen} as={Fragment}>
						<Dialog
							as='div'
							className='fixed inset-0 flex z-40 lg:hidden'
							onClose={setMobileFiltersOpen}
						>
							<Transition.Child
								as={Fragment}
								enter='transition ease-in-out duration-300 transform'
								enterFrom='translate-x-full'
								enterTo='translate-x-0'
								leave='transition ease-in-out duration-300 transform'
								leaveFrom='translate-x-0'
								leaveTo='translate-x-full'
							>
								<Dialog.Panel className='ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto'>
									<div className='px-4 flex items-center justify-between'>
										<Dialog.Title className='text-lg font-medium text-gray-900'>
											Filters
										</Dialog.Title>
										<button
											type='button'
											className='-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'
											onClick={() => setMobileFiltersOpen(false)}
										>
											<span className='sr-only'>Close menu</span>
											<XMarkIcon className='h-6 w-6' aria-hidden='true' />
										</button>
									</div>

									{/* Mobile Filters*/}
									<form className='mt-4 border-t border-gray-200'>
										<Disclosure
											as='div'
											className='border-t border-gray-200 px-4 py-6'
										>
											{({ open }) => (
												<>
													<h3 className='-mx-2 -my-3 flow-root'>
														<Disclosure.Button className='px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500'>
															<span className='font-medium text-gray-900'>
																Category
															</span>
															<span className='ml-6 flex items-center'>
																{open ? (
																	<MinusIcon
																		className='h-5 w-5'
																		aria-hidden='true'
																	/>
																) : (
																	<PlusIcon
																		className='h-5 w-5'
																		aria-hidden='true'
																	/>
																)}
															</span>
														</Disclosure.Button>
													</h3>
													<Disclosure.Panel className='pt-6'>
														<div className='space-y-6'>
															{categories &&
																categories.map((category) => (
																	<MobileCategory
																		key={category.id}
																		category={category}
																	/>
																))}
														</div>
													</Disclosure.Panel>
												</>
											)}
										</Disclosure>

										<div className='flex justify-center items-center p-4 w-full'>
											<div className='flex items-center justify-center my-4 w-full'>
												<div className='border border-gray-300 w-1/6 h-px'></div>
												<span className='px-2 text-gray-500'>
													Other Filters
												</span>
												<div className='border border-gray-300 h-px w-1/6'></div>
											</div>
										</div>
										{filters.map((section) => (
											<FilterComponent
												key={section.id}
												filter={section}
												isMobile={true}
											/>
										))}
									</form>
								</Dialog.Panel>
							</Transition.Child>
						</Dialog>
					</Transition>
				</>

				<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='relative z-10 flex items-baseline justify-between pt-6 pb-6 border-b border-gray-200'>
						<h1 className='text-4xl font-extrabold tracking-tight text-gray-900 hidden md:block'>
							Products
						</h1>
						<div className='flex items-center w-full justify-end '>
							<SearchInput />
							<Menu as='div' className='relative inline-block text-left'>
								<div>
									<Menu.Button className='group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900'>
										Sort
										<ChevronDownIcon
											className='flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500'
											aria-hidden='true'
										/>
									</Menu.Button>
								</div>

								<Transition
									as={Fragment}
									enter='transition ease-out duration-100'
									enterFrom='transform opacity-0 scale-95'
									enterTo='transform opacity-100 scale-100'
									leave='transition ease-in duration-75'
									leaveFrom='transform opacity-100 scale-100'
									leaveTo='transform opacity-0 scale-95'
								>
									<Menu.Items className='origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
										<div className='py-1'>
											{sortOptions.map((option, optionIdx) => (
												<SortOption option={option} key={optionIdx} />
											))}
										</div>
									</Menu.Items>
								</Transition>
							</Menu>

							<button
								type='button'
								className='p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden'
								onClick={() => setMobileFiltersOpen(true)}
							>
								<span className='sr-only'>Filters</span>

								<FunnelIcon className='w-5 h-5' aria-hidden='true' />
							</button>
						</div>
					</div>

					<section aria-labelledby='products-heading' className='pt-6 pb-24'>
						<h2 id='products-heading' className='sr-only'>
							Products
						</h2>

						<div className='grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10'>
							{/* PC Filters */}
							<form className='hidden lg:block'>
								<Disclosure as='div' className='border-b border-gray-200 py-6'>
									{({ open }) => (
										<>
											<h3 className='-my-3 flow-root'>
												<Disclosure.Button className='py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500'>
													<span className='font-medium text-gray-900'>
														Category
													</span>
													<span className='ml-6 flex items-center'>
														{open ? (
															<MinusIcon
																className='h-5 w-5'
																aria-hidden='true'
															/>
														) : (
															<PlusIcon
																className='h-5 w-5'
																aria-hidden='true'
															/>
														)}
													</span>
												</Disclosure.Button>
											</h3>
											<Disclosure.Panel className='pt-6'>
												<div className='space-y-4'>
													{categories &&
														categories.map((category) => (
															<Category key={category.id} category={category} />
														))}
												</div>
											</Disclosure.Panel>
										</>
									)}
								</Disclosure>
								<div className='flex justify-center items-center p-4 w-full'>
									<div className='flex items-center justify-center my-4 w-full'>
										<div className='border border-gray-300 w-1/6 h-px'></div>
										<span className='px-2 text-gray-500'>Other Filters</span>
										<div className='border border-gray-300 h-px w-1/6'></div>
									</div>
								</div>
								{filters.map((section) => (
									<FilterComponent
										key={section.id}
										filter={section}
										isMobile={false}
									/>
								))}
							</form>

							{/* Product grid */}
							<div className='lg:col-span-3'>{children}</div>
						</div>
					</section>
				</main>
			</div>
		</div>
	);
}
