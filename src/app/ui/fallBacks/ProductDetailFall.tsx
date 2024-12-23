export default function ProductDetailFall() {
	return (
		<div className='container px-5 py-24 mx-auto'>
			<div className='lg:w-4/5 mx-auto flex flex-wrap'>
				<div className='lg:w-1/2 w-full lg:h-auto h-64 bg-gray-300 rounded animate-pulse'>
					<div className='lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded bg-slate-400'></div>
					{/* <Image
						alt='Product image placeholder'
						className='lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded'
						src='/placeholder.svg?height=400&width=400'
						width={400}
						height={400}
					/> */}
				</div>
				<div className='lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0'>
					<h2 className='text-sm title-font text-gray-500 tracking-widest bg-gray-300 h-4 w-2/5 mb-1 rounded animate-pulse'></h2>
					<h1 className='text-gray-900 text-3xl title-font font-medium mb-1 bg-gray-300 h-8 w-3/4 rounded animate-pulse'></h1>
					<div className='flex mb-4'>
						<span className='flex items-center'>
							{[...Array(5)].map((_, i) => (
								<span
									key={i}
									className='w-4 h-4 mr-1 bg-gray-300 rounded-full animate-pulse'
								></span>
							))}
							<span className='text-gray-600 ml-3 bg-gray-300 h-4 w-20 rounded animate-pulse'></span>
						</span>
						<span className='flex ml-3 pl-3 py-2 border-l-2 border-gray-200'>
							{[...Array(3)].map((_, i) => (
								<span
									key={i}
									className='w-5 h-5 ml-1 bg-gray-300 rounded-full animate-pulse'
								></span>
							))}
						</span>
					</div>
					<p className='leading-relaxed bg-gray-300 h-4 w-full mb-2 rounded animate-pulse'></p>
					<p className='leading-relaxed bg-gray-300 h-4 w-5/6 mb-2 rounded animate-pulse'></p>
					<p className='leading-relaxed bg-gray-300 h-4 w-4/6 rounded animate-pulse'></p>
					<div className='flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5'>
						<div className='flex items-center'>
							<span className='mr-3'>Color</span>
							{[...Array(3)].map((_, i) => (
								<button
									key={i}
									className='border-2 border-gray-300 ml-1 rounded-full w-6 h-6 focus:outline-none'
								></button>
							))}
						</div>
						<div className='flex ml-6 items-center'>
							<span className='mr-3'>Size</span>
							<div className='relative'>
								<select className='rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10'>
									<option>SM</option>
									<option>M</option>
									<option>L</option>
									<option>XL</option>
								</select>
								<span className='absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center'>
									<svg
										fill='none'
										stroke='currentColor'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										className='w-4 h-4'
										viewBox='0 0 24 24'
									>
										<path d='M6 9l6 6 6-6'></path>
									</svg>
								</span>
							</div>
						</div>
					</div>
					<div className='flex'>
						<span className='title-font font-medium text-2xl text-gray-900 bg-gray-300 h-8 w-28 rounded animate-pulse'></span>
						<button className='flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded'>
							Button
						</button>
						<button className='rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4'>
							<svg
								fill='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								className='w-5 h-5'
								viewBox='0 0 24 24'
							>
								<path d='M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z'></path>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
