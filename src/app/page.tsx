import Image from 'next/image';
import BestSeller from './ui/home/BestSeller';
import NewestProducts from './ui/home/NewestProducts';

export default async function Home() {
	return (
		<div className='max-w-screen-2xl box-border w-11/12 m-auto  bg-white flex flex-col items-center gap-14 pb-10'>
			<section className=' w-full'>
				<Image
					src='/images/mainImg.webp'
					alt='Main Img'
					width={1200}
					height={800}
					className='w-full h-auto'
				/>
			</section>
			<section className='  text-center w-2/4 '>
				<h1 className='text-4xl mb-4'>Your Shopping, Simplified</h1>
				<p className='text-center text-2xl m-auto'>
					Enjoy a seamless shopping experience with us. Our user-friendly
					website and dedicated customer support team are here to assist you
					every step of the way. Discover the joy of hassle-free shopping and
					have your favorite items delivered right to your doorstep.
				</p>
			</section>

			<section className='w-11/12'>
				<BestSeller />
				<NewestProducts />
			</section>
		</div>
	);
}
