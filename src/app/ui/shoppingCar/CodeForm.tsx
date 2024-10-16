export default function CodeForm() {
	return (
		<form className='space-y-4'>
			<div>
				<label
					htmlFor='voucher'
					className='mb-2 block text-sm font-medium text-gray-900 '
				>
					{' '}
					Do you have a voucher or gift card?{' '}
				</label>
				<input
					type='text'
					id='voucher'
					className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500  '
					placeholder=''
					required
				/>
			</div>
			<button
				type='submit'
				className='flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-gray-800 hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 '
			>
				Apply Code
			</button>
		</form>
	);
}
