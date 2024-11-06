'use client';
import { useState } from 'react';

interface StarRatingProps {
	rating: number;
	maxRating?: number;
	size?: number;
	color?: string;
	onRatingChange?: (newRating: number) => void;
	isInteractive?: boolean; // Nueva propiedad para controlar interactividad
}

export default function StarRating({
	rating,
	maxRating = 5,
	size = 24,
	color = 'text-yellow-400',
	onRatingChange,
	isInteractive = false, // Valor predeterminado para visualización sin interacción
}: StarRatingProps) {
	const [currentRating, setCurrentRating] = useState(rating);

	const handleRating = (index: number, isHalf: boolean) => {
		const newRating = index + (isHalf ? 0.5 : 1);
		setCurrentRating(newRating);
		if (onRatingChange) onRatingChange(newRating);
	};

	const roundedRating = Math.round(currentRating * 2) / 2;

	return (
		<div
			className='flex items-center'
			aria-label={`Rating: ${currentRating} out of ${maxRating} stars`}
		>
			{[...Array(maxRating)].map((_, index) => (
				<Star
					key={index}
					filled={Math.min(roundedRating - index, 1)}
					size={size}
					color={color}
					onClick={(e) => {
						if (isInteractive) {
							// Solo permite interacción si es `true`
							const { left, width } = e.currentTarget.getBoundingClientRect();
							const isHalf = e.clientX < left + width / 2;
							handleRating(index, isHalf);
						}
					}}
					isInteractive={isInteractive} // Pasar al componente `Star` para ajustar el cursor
				/>
			))}
		</div>
	);
}

interface StarProps {
	filled: number;
	size: number;
	color: string;
	onClick?: (e: React.MouseEvent<SVGElement>) => void;
	isInteractive: boolean;
}

function Star({ filled, size, color, onClick, isInteractive }: StarProps) {
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
			onClick={isInteractive ? onClick : undefined} // Solo agregar `onClick` si es interactivo
			style={{ cursor: isInteractive ? 'pointer' : 'default' }} // Cambia el cursor según `isInteractive`
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
