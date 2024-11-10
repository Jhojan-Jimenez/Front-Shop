import Image from 'next/image';

export default function RecommendedProd() {
	return (
		<div className='space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm '>
			<a href='#' className='overflow-hidden rounded'>
				<Image
					width={400}
					height={400}
					className='mx-auto h-44 w-44 '
					src={'https://i.imgur.com/OQC8C35.jpeg'}
					alt='imac image'
				/>
			</a>
			<div>
				<a
					href='#'
					className='text-lg font-semibold leading-tight text-gray-900 hover:underline e'
				>
					iMac 27”
				</a>
				<p className='mt-2 text-base font-normal text-gray-500 '>
					This generation has some improvements, including a longer continuous
					battery life.
				</p>
			</div>
			<div>
				<p className='text-lg font-bold text-gray-900 '>
					<span className='line-through'> $399,99 </span>
				</p>
				<p className='text-lg font-bold leading-tight text-red-600 '>$299</p>
			</div>
			<div className='mt-6 flex items-center gap-2.5'>
				<button
					data-tooltip-target='favourites-tooltip-1'
					type='button'
					className='inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 '
				>
					<svg
						className='h-5 w-5'
						aria-hidden='true'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
					>
						<path
							stroke='currentColor'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z'
						></path>
					</svg>
				</button>
				<div
					id='favourites-tooltip-1'
					role='tooltip'
					className='tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 '
				>
					Add to favourites
					<div className='tooltip-arrow' data-popper-arrow></div>
				</div>
				<button
					type='button'
					className='inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  text-gray-900 hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 bg-primary-600 hover:bg-primary-700 focus:ring-primary-800'
				>
					<svg
						className='-ms-2 me-2 h-5 w-5'
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
							d='M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4'
						/>
					</svg>
					Add to cart
				</button>
			</div>
		</div>
	);
}
