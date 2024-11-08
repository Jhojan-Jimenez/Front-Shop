import React, { useState } from 'react';
import StarRating from '../../StarRating';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PostReviewData, PostReviewForm } from '@/app/lib/validators';
import { createReview } from '@/app/lib/actions/reviews';
import toast from 'react-hot-toast';

export default function CreateReview({
	setShowModal,
	productId,
}: {
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	productId: number;
}) {
	const [rating, setRating] = useState(5);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<PostReviewData>({
		resolver: zodResolver(PostReviewForm),
	});
	const postReview = async (data: { comment: string }) => {
		try {
			await createReview(productId, { rating, comment: data.comment });
		} catch (error) {
			if (error instanceof Error && error.message === 'AlreadyHaveReview') {
				toast.error('You already have a review for this product');
			}
		}
	};
	return (
		<div
			id='review-modal'
			tabIndex={-1}
			className='fixed left-0 right-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50'
		>
			<div className='relative max-w-2xl w-full p-4'>
				<div className='relative rounded-lg bg-white shadow'>
					<div className='flex items-center justify-between rounded-t border-b border-gray-200 p-4 md:p-5'>
						<h3 className='text-lg font-semibold text-gray-900'>
							Add a review for:
						</h3>
						<button
							type='button'
							onClick={() => setShowModal(false)}
							className='inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-black hover:bg-gray-200 hover:text-gray-900'
						>
							<span className='sr-only'>Close modal</span>
							&#x2715;
						</button>
					</div>
					<form className='p-4 md:p-5' onSubmit={handleSubmit(postReview)}>
						<div className='mb-4 grid grid-cols-2 gap-4'>
							<div className='col-span-2'>
								<div className='flex items-center'>
									<StarRating
										rating={5}
										isInteractive={true}
										onRatingChange={(newRating) => setRating(newRating)}
									/>
									<span className='ms-2 text-lg font-bold text-gray-900 '>
										{rating} out of 5
									</span>
								</div>
							</div>
							<div className='col-span-2'>
								<label
									htmlFor='comment'
									className='mb-2 block text-sm font-medium text-gray-900 '
								>
									Review comment
								</label>
								<textarea
									{...register('comment')}
									id='comment'
									rows={6}
									className='mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 '
								></textarea>
								{errors.comment && (
									<span className='text-red-500'>{errors.comment.message}</span>
								)}
							</div>
						</div>
						<div className='border-t border-gray-200 pt-4  md:pt-5'>
							<button
								type='button'
								data-modal-toggle='review-modal'
								className='me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 '
								onClick={() => setShowModal(false)}
							>
								Cancel
							</button>
							<button
								type='submit'
								data-modal-toggle='review-modal'
								className='me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 '
							>
								Add review
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}