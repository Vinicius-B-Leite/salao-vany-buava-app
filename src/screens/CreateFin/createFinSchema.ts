import { z } from "zod"

export const creatFinSchema = z.object({
	clientName: z.string().min(3, "Nome do cliente deve ter no mínimo 3 caracteres"),
	proceedings: z.string().min(3, "Selecione ao menos um procedimento"),
	type: z.string(),
	date: z.date(),
	value: z.string().min(1, "Mínimo de 1 real"),
	paymentForm: z.string(),
	category: z.string(),
})

export type CreateFinForm = z.infer<typeof creatFinSchema>
