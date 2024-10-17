'use client';
import { useLoading } from '@/app/context/LoadingContext';
import { resetPasswordConfirm } from '@/app/lib/sessions';
import { newPasswordForm, newPasswordFormData } from '@/app/lib/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function page({
	params,
}: {
	params: { uid: string; token: string };
}) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<newPasswordFormData>({
		resolver: zodResolver(newPasswordForm),
	});
	const router = useRouter();
	const { setLoading } = useLoading();
	const newPasswordSubmit = async (formData: newPasswordFormData) => {
		setLoading(true);
		try {
			await resetPasswordConfirm(
				params.uid,
				params.token,
				formData.password,
				formData.re_password
			);
			router.push('/login');
			toast.success('Password Correctly changed');
		} catch (error: unknown) {
			toast.error('Server Error');
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
					Change your password
				</h2>
			</div>
			<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
				<form
					className='space-y-6'
					action='#'
					method='POST'
					onSubmit={handleSubmit(newPasswordSubmit)}
				>
					<div>
						<div className='flex items-center justify-between'>
							<label
								htmlFor='password'
								className='block text-sm font-medium leading-6 text-gray-900'
							>
								New Password
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
								<div className='text-red-500'>
									<p>Password must:</p>
									{Array.isArray(errors.password.message) ? (
										<ul>
											{errors.password.message.map(
												(error: string, index: number) => (
													<li key={index}>- {error}</li>
												)
											)}
										</ul>
									) : (
										<p>{errors.password.message}</p>
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

					<div>
						<button
							type='submit'
							className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
