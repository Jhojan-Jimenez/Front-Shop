import { ProductSchema } from '@/app/lib/types';
import ProductListComponent from './ProductListComponent';

export default async function ProductList({
	products,
}: {
	products: [ProductSchema];
}) {
	return (
		<>
			{products ? (
				products.map((product: ProductSchema) => {
					return <ProductListComponent key={product.id} product={product} />;
				})
			) : (
				<p>No products found</p>
			)}
		</>
	);
}
