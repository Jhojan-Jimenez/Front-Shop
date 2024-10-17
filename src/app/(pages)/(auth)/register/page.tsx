'use client';

import { useAuth } from '@/app/context/AuthContext';
import { useLoader } from '@/app/hooks/useLoader';
import { Users } from '@/app/lib/users';

import { FormRegData, userRegSchema } from '@/app/lib/validators';
import Loader from '@/app/ui/modals/Loader';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

function Page() {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<FormRegData>({
		resolver: zodResolver(userRegSchema),
	});
	const router = useRouter();
	const { setLoading } = useAuth();
	const regSubmit = async (data: FormRegData) => {
		setLoading(true);
		try {
			await Users.signup(data);
			router.push('/products');

			toast.success('We send you an email to activate your account');
		} catch (error: unknown) {
			if (isAxiosError(error)) {
				const errors = error.response?.data;
				if (errors.email) {
					setError('email', { type: 'manual', message: errors.email });
				}
				if (errors.password) {
					setError('password', { type: 'manual', message: errors.password });
				}
			} else {
				toast.error('Error en Register Page');
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
				<Image
					width={16}
					height={16}
					className='mx-auto h-10 w-auto'
					src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
					alt='Your Company'
				/>
				<h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
					Register your account
				</h2>
			</div>
			<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
				<form
					className='space-y-6'
					action='#'
					method='POST'
					onSubmit={handleSubmit(regSubmit)}
				>
					<div className='flex flex-row justify-between'>
						<div>
							<label
								htmlFor='first_name'
								className='block text-sm font-medium leading-6 text-gray-900'
							>
								First Name
							</label>
							<div className='mt-2'>
								<input
									id='first_name'
									type='text'
									{...register('first_name')}
									required
									className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
								/>
								{errors.first_name && (
									<span className='text-red-500'>
										{errors.first_name.message}
									</span>
								)}
							</div>
						</div>
						<div>
							<label
								htmlFor='last_name'
								className='block text-sm font-medium leading-6 text-gray-900'
							>
								Last Name
							</label>
							<div className='mt-2'>
								<input
									id='last_name'
									type='text'
									{...register('last_name')}
									required
									className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
								/>
								{errors.last_name && (
									<span className='text-red-500'>
										{errors.last_name.message}
									</span>
								)}
							</div>
						</div>
					</div>
					<div>
						<label
							htmlFor='email'
							className='block text-sm font-medium leading-6 text-gray-900'
						>
							Email address
						</label>
						<div className='mt-2'>
							<input
								id='email'
								type='email'
								{...register('email')}
								required
								className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
							/>
							{errors.email && (
								<span className='text-red-500'>{errors.email.message}</span>
							)}
						</div>
					</div>

					<div>
						<div className='flex items-center justify-between'>
							<label
								htmlFor='password'
								className='block text-sm font-medium leading-6 text-gray-900'
							>
								Password
							</label>
						</div>
						<div className='mt-2'>
							<input
								id='password'
								type='password'
								{...register('password')}
								required
								className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
							/>
							{errors?.password?.message && (
								<div>
									<p>Password must:</p>
									{Array.isArray(errors.password.message) ? ( // Check if it's an array
										<ul>
											{errors.password.message.map(
												(error: string, index: number) => (
													<li key={index}>- {error}</li>
												)
											)}
										</ul>
									) : (
										<p>Password Error: {errors.password.message}</p> // Single message
									)}
								</div>
							)}
						</div>
					</div>
					<div>
						<div className='flex items-center justify-between'>
							<label
								htmlFor='re_password'
								className='block text-sm font-medium leading-6 text-gray-900'
							>
								Confirm Password
							</label>
						</div>
						<div className='mt-2'>
							<input
								id='re_password'
								type='password'
								{...register('re_password')}
								required
								className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
							/>
							{errors.re_password && (
								<span className='text-red-500'>
									{errors.re_password.message}
								</span>
							)}
						</div>
					</div>
					<p className='mt-6 text-sm text-center text-gray-400'>
						Do you have an account already?{' '}
						<a
							href='http://localhost:3000/login'
							className='text-blue-500 focus:outline-none focus:underline hover:underline'
						>
							Sign in
						</a>
						.
					</p>

					<div>
						<button
							type='submit'
							className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
						>
							Sign Up
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Page;
