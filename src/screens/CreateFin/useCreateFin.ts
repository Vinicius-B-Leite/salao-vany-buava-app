import { finService } from "@/models"
import { CreateFinForm } from "./createFinSchema"
import { useState } from "react"
import { ToastAndroid } from "react-native"

export const useCreateFin = (onSucess?: () => void) => {
	const [loading, setLoading] = useState(false)
	const submit = async (data: CreateFinForm) => {
		try {
			setLoading(true)
			await finService.createFin({
				category: data.category,
				clientName: data.clientName,
				date: data.date.toISOString(),
				paymentForm: data.paymentForm,
				proceedings: data.proceedings,
				type: data.type,
				value: data.value,
			})
			onSucess && onSucess()
		} catch (error) {
			ToastAndroid.show("Erro ao criar o financeiro", ToastAndroid.SHORT)
		} finally {
			setLoading(false)
		}
	}

	return {
		submit,
		loading,
	}
}
