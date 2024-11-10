'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface PaginationProps {
	totalItems: number;
}

export default function Pagination({ totalItems }: PaginationProps) {
	const searchParams = useSearchParams();
	const itemsPerPage = 12;
	const page = Number(searchParams.get('page')) || 1;
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	const startItem = (page - 1) * itemsPerPage + 1;
	const endItem = Math.min(page * itemsPerPage, totalItems);

	const createPageUrl = (pageNumber: number) => {
		const params = new URLSearchParams(searchParams);
		params.set('page', pageNumber.toString());
		return `?${params.toString()}`;
	};

	const renderPageLink = (pageNumber: number, label?: string) => (
		<Link
			key={pageNumber}
			href={createPageUrl(pageNumber)}
			className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
				pageNumber === page
					? 'z-10 bg-primary text-primary-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
					: 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
			}`}
		>
			{label || pageNumber}
		</Link>
	);

	return (
		<div className='flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6'>
			<div className='flex flex-1 justify-between sm:hidden'>
				<Link
					href={createPageUrl(page - 1)}
					className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${
						page === 1 ? 'pointer-events-none opacity-50' : ''
					}`}
				>
					Previous
				</Link>
				<Link
					href={createPageUrl(page + 1)}
					className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${
						page === totalPages ? 'pointer-events-none opacity-50' : ''
					}`}
				>
					Next
				</Link>
			</div>
			<div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
				<div>
					<p className='text-sm text-gray-700'>
						Showing
						<span className='font-medium px-1'>{startItem}</span>
						to
						<span className='font-medium px-1'>{endItem}</span>
						of
						<span className='font-medium px-1'>{totalItems}</span>
						results
					</p>
				</div>
				<div>
					<nav
						className='isolate inline-flex -space-x-px rounded-md shadow-sm'
						aria-label='Pagination'
					>
						<Link
							href={createPageUrl(page - 1)}
							className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
								page === 1 ? 'pointer-events-none opacity-50' : ''
							}`}
						>
							<span className='sr-only'>Previous</span>
							<ChevronLeft className='h-5 w-5' />
						</Link>

						{[...Array(totalPages)].map((_, i) => {
							const pageNumber = i + 1;
							if (
								pageNumber === 1 ||
								pageNumber === totalPages ||
								(pageNumber >= page - 1 && pageNumber <= page + 1)
							) {
								return renderPageLink(pageNumber);
							} else if (pageNumber === page - 2 || pageNumber === page + 2) {
								return (
									<span
										key={pageNumber}
										className='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0'
									>
										...
									</span>
								);
							}
							return null;
						})}

						<Link
							href={createPageUrl(page + 1)}
							className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
								page === totalPages ? 'pointer-events-none opacity-50' : ''
							}`}
						>
							<span className='sr-only'>Next</span>
							<ChevronRight className='h-5 w-5' />
						</Link>
					</nav>
				</div>
			</div>
		</div>
	);
}
