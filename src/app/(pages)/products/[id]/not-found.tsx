import Link from 'next/link';

export default function NotFound() {
	return (
		<div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
			<h1 className='text-4xl font-bold text-gray-800'>Product Not Found</h1>
			<p className='text-gray-600 mb-8'>
				Sorry, But this product does not exist.
			</p>
			<Link
				href={'/products'}
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
			>
				Return
			</Link>
		</div>
	);
}
