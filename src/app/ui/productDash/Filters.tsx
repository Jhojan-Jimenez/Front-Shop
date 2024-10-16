'use client';
import FilterModal from './FilterModal';
import RoutePage from './RoutePage';
import { useState } from 'react';
export default function Filters() {
	const [show, setShow] = useState(false);
	const hiddenModal = () => {
		setShow(false);
	};
	const handleModal = () => {
		setShow(!show);
	};
	return (
		<>
			<div className='mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8'>
				<div>
					<RoutePage />
					<h2 className='mt-3 text-xl font-semibold text-gray-900 sm:text-2xl'>
						Electronics
					</h2>
				</div>
				<div className='flex items-center space-x-4'>
					<button
						onClick={handleModal}
						type='button'
						className='flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100  sm:w-auto'
					>
						<svg
							className='-ms-0.5 me-2 h-4 w-4'
							aria-hidden='true'
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							fill='none'
							viewBox='0 0 24 24'
						>
							<path
								stroke='currentColor'
								strokeLinecap='round'
								strokeWidth='2'
								d='M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z'
							/>
						</svg>
						Filters
						<svg
							className='-me-0.5 ms-2 h-4 w-4'
							aria-hidden='true'
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							fill='none'
							viewBox='0 0 24 24'
						>
							<path
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='m19 9-7 7-7-7'
							/>
						</svg>
					</button>
					<button
						id='sortDropdownButton1'
						data-dropdown-toggle='dropdownSort1'
						type='button'
						className='flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 '
					>
						<svg
							className='-ms-0.5 me-2 h-4 w-4'
							aria-hidden='true'
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							fill='none'
							viewBox='0 0 24 24'
						>
							<path
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M7 4v16M7 4l3 3M7 4 4 7m9-3h6l-6 6h6m-6.5 10 3.5-7 3.5 7M14 18h4'
							/>
						</svg>
						Sort
						<svg
							className='-me-0.5 ms-2 h-4 w-4'
							aria-hidden='true'
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							fill='none'
							viewBox='0 0 24 24'
						>
							<path
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='m19 9-7 7-7-7'
							/>
						</svg>
					</button>
					<div
						id='dropdownSort1'
						className='z-50 hidden w-40 divide-y divide-gray-100 rounded-lg bg-white shadow '
						data-popper-placement='bottom'
					>
						<ul
							className='p-2 text-left text-sm font-medium text-gray-500 '
							aria-labelledby='sortDropdownButton'
						>
							<li>
								<a
									href='#'
									className='group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 '
								>
									{' '}
									The most popular{' '}
								</a>
							</li>
							<li>
								<a
									href='#'
									className='group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 '
								>
									{' '}
									Newest{' '}
								</a>
							</li>
							<li>
								<a
									href='#'
									className='group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 '
								>
									{' '}
									Increasing price{' '}
								</a>
							</li>
							<li>
								<a
									href='#'
									className='group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 '
								>
									{' '}
									Decreasing price{' '}
								</a>
							</li>
							<li>
								<a
									href='#'
									className='group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 '
								>
									{' '}
									No. reviews{' '}
								</a>
							</li>
							<li>
								<a
									href='#'
									className='group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 '
								>
									{' '}
									Discount %{' '}
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<FilterModal show={show} hiddenModal={hiddenModal} />
		</>
	);
}
