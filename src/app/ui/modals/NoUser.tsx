import Link from 'next/link';
import { useState } from 'react';

export default function NoUser() {
	const [isOpen, setIsOpen] = useState(true);
	const closeModal = () => setIsOpen(false);

	return (
		<div>
			{isOpen && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
					<div className='bg-white rounded-lg p-8 max-w-sm w-full mx-4 relative'>
						<Link
							href={'/shopping'}
							onClick={closeModal}
							className='absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none'
							aria-label='Close modal'
						>
							<svg
								className='w-6 h-6'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M6 18L18 6M6 6l12 12'
								/>
							</svg>
						</Link>
						<h2 className='text-2xl font-bold mb-4'>Please log in</h2>
						<p className='text-gray-700'>
							To access this feature, you need to be logged in. Please sign in
							to your account or create a new one.
						</p>
						<div className='mt-6 flex justify-end'>
							<Link
								href={'/shopping'}
								onClick={closeModal}
								className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
							>
								Close
							</Link>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
