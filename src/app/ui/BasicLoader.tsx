import React from 'react';
import MoonLoader from 'react-spinners/MoonLoader';
export default function BasicLoader() {
	return (
		<div className='flex justify-center items-center'>
			<MoonLoader />
		</div>
	);
}
