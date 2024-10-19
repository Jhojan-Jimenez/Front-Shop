'use client';

import { useAuth } from '@/app/context/AuthContext';
import { useLoading } from '@/app/context/LoadingContext';
import { Users } from '@/app/lib/actions/users';
import { FormLogData, userLogSchema } from '@/app/lib/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
function Page() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormLogData>({
		resolver: zodResolver(userLogSchema),
	});
	const router = useRouter();
	const { login } = useAuth();
	const { setLoading } = useLoading();
	const logSubmit = async (formData: FormLogData) => {
		setLoading(true);
		try {
			await Users.signin(formData);
			login(formData);
			router.push('/products');
			toast.success('User correctly login');
		} catch (error: unknown) {
			if (isAxiosError(error)) {
				const errors = error.response?.data;
				if (errors.detail) {
					toast.error('There is not a user with those credentials');
				}
			} else {
				toast.error('Server Error');
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
					Sign in to your account
				</h2>
			</div>
			<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
				<form
					className='space-y-6'
					action='#'
					method='POST'
					onSubmit={handleSubmit(logSubmit)}
				>
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
							<p className='text-sm text-center text-gray-400'>
								<Link
									href='/reset_password'
									className='text-blue-500 focus:outline-none focus:underline hover:underline'
								>
									Forgot Password?
								</Link>
							</p>
						</div>
						<div className='mt-2'>
							<input
								id='password'
								type='password'
								{...register('password')}
								className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
							/>
							{errors.password && (
								<span className='text-red-500'>{errors.password.message}</span>
							)}
						</div>
					</div>

					<div>
						<button
							type='submit'
							className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
						>
							Sign in
						</button>
					</div>
				</form>
				<p className='mt-6 text-sm text-center text-gray-400'>
					Don&#x27;t have an account yet?{' '}
					<a
						href='http://localhost:3000/login'
						className='text-blue-500 focus:outline-none focus:underline hover:underline'
					>
						Sign up
					</a>
					.
				</p>
				<div className='sm:mx-auto sm:w-full sm:max-w-sm mt-6 text-center text-md text-gray-700'>
					Or continue with
				</div>
				<div className='sm:mx-auto sm:w-full sm:max-w-sm flex justify-around items-center gap-x-4 mt-4 p-2'>
					<button
						// onClick={() => signIn("github", { redirectTo: "/" })}
						className='shadow-sm shadow-gray-600 rounded-sm flex-1 py-2 flex items-center justify-center'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='w-5 h-5 mr-2'
							viewBox='0 0 50 50'
						>
							<path d='M17.791,46.836C18.502,46.53,19,45.823,19,45v-5.4c0-0.197,0.016-0.402,0.041-0.61C19.027,38.994,19.014,38.997,19,39 c0,0-3,0-3.6,0c-1.5,0-2.8-0.6-3.4-1.8c-0.7-1.3-1-3.5-2.8-4.7C8.9,32.3,9.1,32,9.7,32c0.6,0.1,1.9,0.9,2.7,2c0.9,1.1,1.8,2,3.4,2 c2.487,0,3.82-0.125,4.622-0.555C21.356,34.056,22.649,33,24,33v-0.025c-5.668-0.182-9.289-2.066-10.975-4.975 c-3.665,0.042-6.856,0.405-8.677,0.707c-0.058-0.327-0.108-0.656-0.151-0.987c1.797-0.296,4.843-0.647,8.345-0.714 c-0.112-0.276-0.209-0.559-0.291-0.849c-3.511-0.178-6.541-0.039-8.187,0.097c-0.02-0.332-0.047-0.663-0.051-0.999 c1.649-0.135,4.597-0.27,8.018-0.111c-0.079-0.5-0.13-1.011-0.13-1.543c0-1.7,0.6-3.5,1.7-5c-0.5-1.7-1.2-5.3,0.2-6.6 c2.7,0,4.6,1.3,5.5,2.1C21,13.4,22.9,13,25,13s4,0.4,5.6,1.1c0.9-0.8,2.8-2.1,5.5-2.1c1.5,1.4,0.7,5,0.2,6.6c1.1,1.5,1.7,3.2,1.6,5 c0,0.484-0.045,0.951-0.11,1.409c3.499-0.172,6.527-0.034,8.204,0.102c-0.002,0.337-0.033,0.666-0.051,0.999 c-1.671-0.138-4.775-0.28-8.359-0.089c-0.089,0.336-0.197,0.663-0.325,0.98c3.546,0.046,6.665,0.389,8.548,0.689 c-0.043,0.332-0.093,0.661-0.151,0.987c-1.912-0.306-5.171-0.664-8.879-0.682C35.112,30.873,31.557,32.75,26,32.969V33 c2.6,0,5,3.9,5,6.6V45c0,0.823,0.498,1.53,1.209,1.836C41.37,43.804,48,35.164,48,25C48,12.318,37.683,2,25,2S2,12.318,2,25 C2,35.164,8.63,43.804,17.791,46.836z'></path>
						</svg>
						Github
					</button>
					<button
						// onClick={() => signIn("google", { redirectTo: "/" })}
						className='shadow-sm shadow-gray-600 rounded-sm flex-1 py-2 flex items-center justify-center'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='w-5 h-5 mr-2'
							viewBox='0 0 48 48'
						>
							<path
								fill='#fbc02d'
								d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z'
							></path>
							<path
								fill='#e53935'
								d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z'
							></path>
							<path
								fill='#4caf50'
								d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z'
							></path>
							<path
								fill='#1565c0'
								d='M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z'
							></path>
						</svg>
						Google
					</button>
				</div>
			</div>
		</div>
	);
}

export default Page;
