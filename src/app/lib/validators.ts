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

export const PaymentSchema = z.object({
	full_name: z
		.string()
		.min(1, 'Is required')
		.min(3, 'Must have more than 3 chars')
		.refine((value) => /^[a-zA-Z]+$/.test(value), {
			message: 'Username must contain only letters',
		}),
	address_line_1: z
		.string()
		.min(1, 'Is required')
		.min(3, 'Must have more than 3 chars')
		.refine((value) => /^[a-zA-Z]+$/.test(value), {
			message: 'Username must contain only letters',
		}),
	address_line_2: z
		.string()
		.min(3, 'Must have more than 3 chars')
		.refine((value) => /^[a-zA-Z]+$/.test(value), {
			message: 'Username must contain only letters',
		})
		.optional(),
	state_province_region: z
		.string()
		.min(1, 'Is required')
		.min(3, 'Must have more than 3 chars')
		.refine((value) => /^[a-zA-Z]+$/.test(value), {
			message: 'Username must contain only letters',
		})
		.optional(),
	postal_zip_code: z
		.string()
		.min(1, 'Is required')
		.min(3, 'Must have more than 3 chars')
		.refine((value) => /^[a-zA-Z]+$/.test(value), {
			message: 'Username must contain only letters',
		})
		.optional(),
	telephone_number: z
		.string()
		.min(1, 'Is required')
		.min(3, 'Must have more than 3 chars')
		.regex(/^\d+$/, 'Must have only numbers'),
});
export type PaymentData = z.infer<typeof PaymentSchema>;

export const PostReviewForm = z.object({
	comment: z
		.string()
		.min(20, { message: 'Be at least 20 characters long' })
		.max(200, { message: 'Must be less than 200 characters' })
		.trim(),
});
export type PostReviewData = z.infer<typeof PostReviewForm>;
