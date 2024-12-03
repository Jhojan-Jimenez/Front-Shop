'use client';

import { Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import BeatLoader from 'react-spinners/BeatLoader';
import ProductsPage from '@/app/ui/ProductsCatalog/ProductsPage';

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
