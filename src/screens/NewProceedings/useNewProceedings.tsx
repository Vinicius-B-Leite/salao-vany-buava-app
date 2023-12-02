import { useState } from "react"
import { NewProceedingsForm } from "./newProceedingsSchema"
import { proceedingsService } from "@/models/Proceedings/proceedingsService"

export function useNewProceedings(handleResetForm: () => void) {
	const [loading, setLoading] = useState(false)

	async function submit(data: NewProceedingsForm) {
		try {
			setLoading(true)
			const { proceedingsName, type } = data
			await proceedingsService.createProceedings(proceedingsName, type)
			handleResetForm()
		} catch (error) {
			console.log(`submit - NewProceedings (Screen) - line 30 ${error}`)
		} finally {
			setLoading(false)
		}
	}

	return {
		loading,
		submit,
	}
}
