import { z } from "zod"

const dateSchema = z
	.object({
		day: z.string().max(2).optional(),
		month: z.string().max(2).optional(),
		year: z.string().max(2).optional(),
	})
	.refine((data) => data.day || data.month || data.year, {
		message: "Pelo menos um dos campos (dia, mês, ano) deve ser preenchido",
	})
export const consultFinSchema = z.object({
	category: z.string(),
	date: dateSchema,
})

export type ConsultFinForm = z.infer<typeof consultFinSchema>
