import * as z from "zod"

export const loginSchema = z.object({
	email: z.string().email("Informe um e-mail válido"),
	password: z.string().min(6, "Minímo de caracteres é 6"),
})

export type LoginForm = z.infer<typeof loginSchema>
