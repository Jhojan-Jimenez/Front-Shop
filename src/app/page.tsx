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
				<h1 className='text-4xl mb-4'>New OP product</h1>
				<p className='text-center text-2xl  m-auto'>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo
					molestiae qui quas eveniet dignissimos officia libero dicta ipsum
					facilis, asperiores fuga ipsa beatae cumque tempora, consequuntur
					accusantium voluptatibus! Blanditiis, suscipit?
				</p>
			</section>

			<section className='w-11/12'>
				<BestSeller />
				<NewestProducts />
			</section>
		</div>
	);
}
