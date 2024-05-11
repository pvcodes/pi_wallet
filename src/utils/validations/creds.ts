import { z } from "zod";

export const CreateCredSchema = z.object({
	key: z.string(),
	value: z.string(),
});

export const UpdateCredSchema = z
	.object({
		id: z.number(),
		key: z.string().optional(),
		value: z.string().optional(),
	})
	.refine((data) => data.key !== undefined || data.value !== undefined, {
		message: "At least one of key or value must be present",
	});
