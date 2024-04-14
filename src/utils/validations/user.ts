import { z } from "zod";

export const LoginSchema = z.object({
	usernameOrEmail: z.string().or(z.string().email()),
});

export const userSignupSchema = z.object({
	username: z.string().min(1),
	email: z.string().email(),
	password: z.string().min(6),
	name: z.string().optional(),
});

export const userUpdateSchema = z
	.object({
		username: z.string().min(1).optional(),
		email: z.string().email().optional(),
		password: z.string().min(6).optional(),
		name: z.string().min(1).optional(),
	})
	.refine(
		(data) => {
			return (
				data.username !== undefined ||
				data.email !== undefined ||
				data.password !== undefined ||
				data.name !== undefined
			);
		},
		{
			message: "At least one field must be provided for update",
		}
	);
