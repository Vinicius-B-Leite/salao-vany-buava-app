import * as z from "zod"
import { Proceedings, ProceedingsTypes } from "@/models/Proceedings/types"

export const scheduleSchema = z.object({
	clientName: z
		.string()
		.min(2, "Mínimo de duas letras")
		.regex(/^[a-zA-Z]+$/, "Apenas letras"),
	type: z.custom<ProceedingsTypes>(),
	totalValue: z.string().min(1, "Mínimo de 1 real"),
	date: z.date(),
	hour: z.date(),
	proceedgins: z.array(z.string()).min(1, "Selecione ao menos um procedimento"),
})

export type ScheduleForm = z.infer<typeof scheduleSchema>
