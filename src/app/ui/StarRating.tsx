import React from 'react';

interface StarRatingProps {
	rating: number;
	maxRating?: number;
	size?: number;
	color?: string;
}

export default function StarRating({
	rating,
	maxRating = 5,
	size = 24,
	color = 'text-yellow-400',
}: StarRatingProps) {
	const roundedRating = Math.round(rating * 2) / 2; // Round to nearest 0.5

	return (
		<div
			className='flex items-center'
			aria-label={`Rating: ${rating} out of ${maxRating} stars`}
		>
			{[...Array(maxRating)].map((_, index) => (
				<Star
					key={index}
					filled={Math.min(roundedRating - index, 1)}
					size={size}
					color={color}
				/>
			))}
		</div>
	);
}

interface StarProps {
	filled: number;
	size: number;
	color: string;
}

function Star({ filled, size, color }: StarProps) {
	return (
		<svg
			className={color}
			width={size}
			height={size}
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<defs>
				<linearGradient id={`star-fill-${filled}`}>
					<stop offset={`${filled * 100}%`} stopColor='currentColor' />
					<stop
						offset={`${filled * 100}%`}
						stopColor='transparent'
						stopOpacity='0'
					/>
				</linearGradient>
			</defs>
			<polygon
				points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'
				fill={`url(#star-fill-${filled})`}
			/>
		</svg>
	);
}

// Example usage
export function ProductRating() {
	return (
		<div className='p-4 bg-white rounded-lg shadow-md'>
			<h2 className='text-xl font-semibold mb-2'>Product Name</h2>
			<div className='flex items-center'>
				<StarRating rating={3.7} />
				<span className='ml-2 text-gray-600'>(3.7)</span>
			</div>
			<p className='mt-2 text-gray-700'>
				This is an example of how to use the StarRating component in a product
				display.
			</p>
		</div>
	);
}
