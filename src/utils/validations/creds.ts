import { z } from "zod";

export const CreateCredSchema = z.object({
	key: z.string().min(4),
	value: z.string().min(4),
});

export const UpdateCredSchema = z
	.object({
		id: z.number(),
		key: z.string().min(4).optional(),
		value: z.string().min(4).optional(),
	})
	.refine((data) => data.key !== undefined || data.value !== undefined, {
		message: "At least one of key or value must be present",
	});
