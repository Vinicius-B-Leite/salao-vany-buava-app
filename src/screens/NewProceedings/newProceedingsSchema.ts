import { ProceedingsTypes } from "@/models/Proceedings/types"
import * as z from "zod"

export const newProceedingsSchema = z.object({
	proceedingsName: z.string().min(2, "Mínimo de duas letras"),
	type: z.custom<ProceedingsTypes>(),
})

export type NewProceedingsForm = z.infer<typeof newProceedingsSchema>
