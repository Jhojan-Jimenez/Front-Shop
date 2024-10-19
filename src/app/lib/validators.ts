import z from 'zod';

export const userLogSchema = z.object({
	email: z.string().min(1, 'Is required').email().trim(),
	password: z
		.string()
		.trim()
		.min(6, { message: 'Be at least 6 characters long' }),
});

export type FormLogData = z.infer<typeof userLogSchema>;

export const userRegSchema = z
	.object({
		first_name: z
			.string()
			.min(1, 'Is required')
			.min(3, 'First name must have more than 3 chars')
			.refine((value) => /^[a-zA-Z]+$/.test(value), {
				message: 'Username must contain only letters',
			}),
		last_name: z
			.string()
			.min(1, 'Is required')
			.min(3, 'Last name must have more than 3 chars')
			.refine((value) => /^[a-zA-Z]+$/.test(value), {
				message: 'Username must contain only letters',
			}),
		email: z.string().min(1, 'Is required').email().trim(),
		password: z
			.string()
			.min(3, { message: 'Be at least 3 characters long' })
			.trim(),
		re_password: z.string().min(1, 'Is required'),
	})
	.refine((data) => data.password === data.re_password, {
		message: 'Passwords do not match',
		path: ['re_password'],
	});
export type FormRegData = z.infer<typeof userRegSchema>;

export const newPasswordForm = z
	.object({
		password: z
			.string()
			.min(6, { message: 'Be at least 6 characters long' })
			.trim(),
		re_password: z.string().min(1, 'Is required'),
	})
	.refine((data) => data.password === data.re_password, {
		message: 'Passwords do not match',
		path: ['re_password'],
	});
export type newPasswordFormData = z.infer<typeof newPasswordForm>;

export const emailSchema = z.object({ email: z.string().email() });
export type emailData = z.infer<typeof emailSchema>;
