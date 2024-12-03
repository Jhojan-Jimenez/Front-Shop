'use client';

import ProductsPage from '@/app/ui/ProductsCatalog/ProductsPage';
import { Suspense } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

function Page() {
	return (
		<Suspense
			fallback={
				<div className='flex justify-center h-full items-center'>
					<BeatLoader />
				</div>
			}
		>
			<ProductsPage />
		</Suspense>
	);
}

export default Page;
