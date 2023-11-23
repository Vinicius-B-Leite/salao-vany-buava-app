import { child, get, push, ref, set } from "firebase/database"
import { proceedingsServiceType } from "./types"
import { db } from "../../service/firebase"

export const proceedingsService: proceedingsServiceType = {
	createProceedings: async (proceedingsName, type) => {
		try {
			const refProcedimento = ref(db, "procedimentos/" + type)
			const newKey = push(refProcedimento)
			await set(newKey, { nome: proceedingsName.toLowerCase() })
		} catch (error) {
			throw error
		}
	},
	getSingleProceeding: async (proceedingsKey, type) => {
		const response = await get(
			child(ref(db), `procedimentos/${type}/${proceedingsKey}`)
		)

		return response.exists() ? response.val() : null
	},
}
