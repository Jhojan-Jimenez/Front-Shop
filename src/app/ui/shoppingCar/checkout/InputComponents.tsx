import { getCountries } from '@/app/lib/actions/orders';
import React, { useEffect, useState } from 'react';

export const CountriesOptions = () => {
	const [countries, setCountries] = useState<string[]>([]);
	useEffect(() => {
		const fetchCountries = async () => {
			const countries = await getCountries();
			setCountries(countries);
		};
		fetchCountries();
	}, []);
	return countries.map((country, index) => {
		return (
			<option key={index} value={country} selected={country === 'Colombia'}>
				{country}
			</option>
		);
	});
};
