'use client';

import { Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import BeatLoader from 'react-spinners/BeatLoader';
import ProductsPage from '@/app/ui/ProductsCatalog/ProductsPage';

function Page() {
	const searchParams = useSearchParams();

	const filters = useMemo(
		() => Object.fromEntries(searchParams.entries()),
		[searchParams]
	);

	return (
		<Suspense
			fallback={
				<div className='flex justify-center h-full items-center'>
					<BeatLoader />
				</div>
			}
		>
			<ProductsPage filters={filters} />
		</Suspense>
	);
}

export default Page;
