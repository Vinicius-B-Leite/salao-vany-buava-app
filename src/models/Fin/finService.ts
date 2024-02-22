import { db } from "@/service"
import { format } from "date-fns"
import { push, ref, set } from "firebase/database"

export type CreateFinProps = {
	clientName: string
	proceedings: string
	type: string
	date: string
	value: string
	paymentForm: string
	category: string
}
export const finService = {
	createFin: async ({
		category,
		clientName,
		date,
		paymentForm,
		proceedings,
		type,
		value,
	}: CreateFinProps) => {
		let newKey = push(ref(db, "finances"))

		await set(newKey, {
			clientName,
			proceedings,
			type,
			date: format(new Date(date), "dd/MM/yyyy"),
			value: value.replace(",", "."),
			paymentForm,
			category,
		})
	},
}
