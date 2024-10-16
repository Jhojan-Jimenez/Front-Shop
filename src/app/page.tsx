import Image from 'next/image';

export default function Home() {
	return (
		<div className='box-border w-11/12 m-auto  bg-white flex flex-col items-center gap-14 pb-10'>
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

			<section className='  w-full'>
				<h1 className='text-3xl mb-6 ml-6'>Lo mejor y mas nuevo</h1>
				<div className='grid grid-cols-6 grid-rows-6 gap-4 h-96 m-4'>
					<div className='col-span-2 row-span-2 bg-red-500'></div>
					<div className='col-span-2 row-span-2 col-start-1 row-start-3  bg-red-400'></div>
					<div className='col-span-2 row-span-2 col-start-1 row-start-5 bg-red-300'></div>
					<div className='col-span-2 row-span-6 col-start-3 row-start-1 bg-green-400'></div>
					<div className='col-span-2 row-span-6 col-start-5 row-start-1 bg-blue-400'></div>
				</div>
			</section>
		</div>
	);
}
