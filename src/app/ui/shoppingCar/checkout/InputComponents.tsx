import { getCountries } from '@/app/lib/actions/orders';
import React, { useEffect, useState } from 'react';

interface CountriesOptionsProps {
	selectedCountry: string;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	setSelectedCountry: (_country: string) => void;
}

export const CountriesOptions: React.FC<CountriesOptionsProps> = ({
	selectedCountry,
	setSelectedCountry,
}) => {
	const [countries, setCountries] = useState<string[]>([]);

	useEffect(() => {
		const fetchCountries = async () => {
			const countries = await getCountries();
			setCountries(countries);
		};
		fetchCountries();
	}, []);

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedCountry(event.target.value);
	};

	return (
		<select
			id='select-country-input-3'
			className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 '
			value={selectedCountry}
			onChange={handleChange}
		>
			{countries.map((country, index) => (
				<option key={index} value={country}>
					{country}
				</option>
			))}
		</select>
	);
};
