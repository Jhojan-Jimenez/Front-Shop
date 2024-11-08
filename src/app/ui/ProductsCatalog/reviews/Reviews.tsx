'use client';
import { ProductSchema, ReviewSchema } from '@/app/lib/types';
import React, { useEffect, useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import StarRating from '../../StarRating';
import { StylizedDateDisplay } from '../../Date';
import { getReviews, removeReview } from '@/app/lib/actions/reviews';
import CreateReview from './CreateReview';
import toast from 'react-hot-toast';
import { useAuth } from '@/app/context/AuthContext';

export default function Reviews({ product }: { product: ProductSchema }) {
	const [reviews, setReviews] = useState<ReviewSchema[]>([]);
	const [showModal, setShowModal] = useState(false);
	const { user } = useAuth();
	useEffect(() => {
		const fetchReviews = async () => {
			const res: [ReviewSchema] = await getReviews(product.id);
			setReviews(res);
		};
		fetchReviews();
	}, [product.id]);

	return (
		<>
			<section className='bg-white py-8 antialiased'>
				<div className='mx-auto max-w-screen-xl px-4 2xl:px-0'>
					<div className='flex items-center gap-2'>
						<h2 className='text-2xl font-semibold text-gray-900 '>Reviews</h2>

						<div className='mt-2 flex items-center gap-2 sm:mt-0'>
							<StarRating rating={product.rating} />
							<p className='text-sm font-medium leading-none text-gray-900 underline hover:no-underline '>
								{' '}
								{reviews?.length} Reviews{' '}
							</p>
						</div>
					</div>

					<div className='my-6 gap-8 sm:flex sm:items-start md:my-8'>
						<div className='shrink-0 space-y-4'>
							<p className='text-2xl font-semibold leading-none text-gray-900 '>
								{product.rating} out of 5
							</p>
							<button
								type='button'
								data-modal-target='review-modal'
								data-modal-toggle='review-modal'
								className='mb-2 me-2 rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-black hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 border-2 '
								onClick={() => setShowModal(true)}
							>
								Write a review
							</button>
						</div>

						<div className='mt-6 min-w-0 flex-1 space-y-3 sm:mt-0'>
							{[5, 4, 3, 2, 1].map((rating, index) => {
								const numReviews = reviews.filter(
									(item) => item.rating > rating - 1 && item.rating <= rating
								)?.length;

								return (
									<div className='flex items-center gap-2' key={index}>
										<p className='w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 '>
											{rating}
										</p>
										<svg
											className='h-4 w-4 shrink-0 text-yellow-300'
											xmlns='http://www.w3.org/2000/svg'
											width='24'
											height='24'
											fill='currentColor'
											viewBox='0 0 24 24'
										>
											<path d='M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z' />
										</svg>
										<div className='h-1.5 w-80 rounded-full bg-gray-200 '>
											<div
												className='h-1.5 rounded-full bg-yellow-300'
												style={{
													width: `${(numReviews / reviews?.length) * 100}%`,
												}}
											></div>
										</div>
										<a
											href='#'
											className='w-8 shrink-0 text-right text-sm font-medium leading-none text-primary-700 hover:underline  sm:w-auto sm:text-left'
										>
											{numReviews}{' '}
											<span className='hidden sm:inline'>reviews</span>
										</a>
									</div>
								);
							})}
						</div>
					</div>
					{reviews && reviews.length > 0 && reviews.map((review) => {
						return (
							<div
								className='py-6 divide-y divide-gray-200 border-y-2'
								key={review.id}
							>
								<div className='gap-3 pb-6 sm:flex sm:items-start'>
									<div className='shrink-0 space-y-2 sm:w-48 md:w-72'>
										<StarRating rating={review.rating} />

										<div className='space-y-0.5'>
											<p className='text-base font-semibold text-gray-900 '>
												{review.user}
											</p>
											<StylizedDateDisplay dateString={review.date_created} />
										</div>
									</div>

									<div className='mt-4 min-w-0 flex-1 space-y-4 sm:mt-0'>
										<p className='text-base font-normal text-black '>
											{review.comment}
										</p>
										{user?.first_name === review.user && (
											<div className='flex items-center gap-4'>
												<div className='flex space-x-4'>
													<button className='px-4 py-2 flex items-center justify-center bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300 ease-in-out'>
														<Pencil className='w-4 h-4 mr-2' />
														Edit
													</button>
													<button
														className='px-4 py-2 flex items-center justify-center bg-red-50 text-red-600 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-300 ease-in-out'
														onClick={async () => {
															await removeReview(product.id);
															toast.success('Review deleted successfully');
														}}
													>
														<Trash2 className='w-4 h-4 mr-2' />
														Delete
													</button>
												</div>
											</div>
										)}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</section>
			{showModal && (
				<CreateReview setShowModal={setShowModal} productId={product.id} />
			)}
		</>
	);
}
