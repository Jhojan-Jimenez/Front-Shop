import { FC } from 'react';

interface StylizedDateDisplayProps {
	dateString: string;
}

export const StylizedDateDisplay: FC<StylizedDateDisplayProps> = ({
	dateString,
}) => {
	const date = new Date(dateString);

	const formattedDate = new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'short',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		timeZoneName: 'short',
	}).format(date);

	const [datePart, timePart] = formattedDate.split(', ');

	return (
		<div className='inline-flex items-center bg-gray-100 rounded-lg p-2 text-sm font-mono'>
			<span className='text-blue-600 font-semibold mr-2'>{datePart}</span>
			<span className='text-gray-600'>@</span>
			<span className='text-green-600 font-semibold ml-2'>{timePart}</span>
		</div>
	);
};
