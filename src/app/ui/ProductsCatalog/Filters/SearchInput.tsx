'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState, ChangeEvent } from 'react';

export default function SearchInput() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [searchValue, setSearchValue] = useState('');

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams);
			if (value) {
				params.set(name, value);
			} else {
				params.delete(name);
			}
			return params.toString();
		},
		[searchParams]
	);

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value);
	};
	const handleButtonClick = () => {
		const currentSearch = searchParams.get('search');
		const newQueryString = createQueryString(
			'search',
			currentSearch === searchValue ? '' : searchValue
		);
		router.push(`?${newQueryString}`, { scroll: false });
	};

	return (
		<div className='relative mr-4'>
			{' '}
			<button
				className='absolute inset-y-0 left-0 flex items-center pl-3'
				onClick={handleButtonClick} // Manejador del click del botón
			>
				{' '}
				<svg
					className='w-5 h-5 text-gray-500'
					fill='currentColor'
					viewBox='0 0 20 20'
					xmlns='http://www.w3.org/2000/svg'
				>
					{' '}
					<path
						fillRule='evenodd'
						d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
						clipRule='evenodd'
					/>{' '}
				</svg>{' '}
			</button>{' '}
			<input
				type='text'
				id='search'
				value={searchValue} // Controlar el valor del input
				onChange={handleInputChange} // Manejador del cambio del input
				className='block p-2 pl-10 w-full text-gray-900 bg-white rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
				placeholder='Buscar'
			/>{' '}
		</div>
	);
}
