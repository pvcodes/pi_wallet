import { z } from "zod";

export const LoginSchema = z.object({
	usernameOrEmail: z.string().or(z.string().email()),
});

export const SignupSchema = z.object({
	username: z.string(),
	email: z.string().email(),
	password: z.string(),
	name: z.string().optional(),
	// usernameOrEmail: z.string().or(z.string().email()),
});
