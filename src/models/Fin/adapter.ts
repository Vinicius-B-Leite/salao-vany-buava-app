import { FinResponse, FinType } from "./types"

const adapter = (data: FinResponse): FinType => {
	function convertToDate(dateString: string): Date {
		const [day, month, year] = dateString.split("/")
		const fullYear = `20${year}`
		const adjustedMonth = parseInt(month) - 1 // Ajusta o mês para a indexação baseada em zero do JavaScript
		const date = new Date(fullYear, adjustedMonth, day)

		return date
	}

	return {
		category: data.category,
		clientName: data.clientName,
		date: convertToDate(`${data.date.day}/${data.date.month}/20${data.date.year}`),
		paymentForm: data.paymentForm,
		proceedings: data.proceedings,
		type: data.type,
		value: data.value,
		id: data.id,
	}
}

export const finAdapter = {
	adapter,
}
