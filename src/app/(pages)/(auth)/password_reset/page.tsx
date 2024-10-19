'use client';
import { useLoading } from '@/app/context/LoadingContext';
import { resetPassword } from '@/app/lib/actions/sessions';
import {
	emailData,
	emailSchema
} from '@/app/lib/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function page() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<emailData>({
		resolver: zodResolver(emailSchema),
	});
	const { setLoading } = useLoading();
	const router = useRouter();
	const newPasswordSubmit = async (formData: emailData) => {
		setLoading(true);
		try {
			await resetPassword(formData.email);
			toast.success(`We send you an email to change your password`);
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
					Recover your password
				</h2>
				z
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
								Email
							</label>
						</div>
						<div className='mt-2'>
							<input
								id='email'
								{...register('email')}
								className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
							/>
							{errors.email && (
								<span className='text-red-500'>{errors.email.message}</span>
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
