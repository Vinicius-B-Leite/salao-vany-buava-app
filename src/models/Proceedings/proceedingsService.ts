import { child, get, push, ref, remove, set } from "firebase/database"
import { Proceedings, ProceedingsResponse, proceedingsServiceType } from "./types"
import { db } from "@/service"

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
	getProceedings: async (type) => {
		const proceedingsRef = child(ref(db), "procedimentos/" + type)
		const snapshot = await get(proceedingsRef)

		if (!snapshot.exists()) return null

		const proceedingsData = snapshot.val() as ProceedingsResponse
		const proceedingsKeys = Object.keys(proceedingsData)
		let proceedings: Proceedings[] = []

		Object.values(proceedingsData).forEach((item, index) => {
			const data: Proceedings = {
				id: proceedingsKeys[index],
				name: item.nome,
				type: type,
			}

			proceedings.push(data)
		})

		return proceedings
	},
	deleteProceedings: async (type, id) => {
		await remove(ref(db, `procedimentos/${type}/${id}`))
	},
}
