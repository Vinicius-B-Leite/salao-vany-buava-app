import { finService } from "@/models"
import { ConsultFinForm } from "./consultFinSchema"
import { useState } from "react"
import { FinType } from "@/models/Fin/types"
import { ToastAndroid } from "react-native"
import { useNavigation } from "@react-navigation/native"

export function useConsultFin() {
	const [isLoading, setIsLoading] = useState(false)
	const navigation = useNavigation()
	const handleConsultFin = async (data: ConsultFinForm) => {
		try {
			setIsLoading(true)

			let response: FinType[] = []
			let dateFormated = {
				day: new Date().getDate().toString(),
				month: (new Date().getMonth() + 1).toString(),
				year: new Date().getFullYear().toString().slice(2, 4),
			}
			if (data.date.day) {
				dateFormated.day = data.date.day.padStart(2, "0")
				response = await finService.filterByDay(
					data.date.day,
					data.date.month,
					data.date.year
				)
			}

			if (data.date.month) {
				dateFormated.month = data.date.month.padStart(2, "0")
				response = await finService.filterByMonth(data.date.month)
			}
			if (data.date.year) {
				dateFormated.year = data.date.year.padStart(2, "0")
				response = await finService.filterByYear(data.date.year)
			}

			navigation.navigate("FinStackRoutes", {
				screen: "ResultFin",
				params: {
					finances: response.filter((fin) =>
						data.category === "pessoal"
							? fin.category == "pessoal"
							: fin.category == "salao"
					),
					category: data.category,
					searchBy: {
						field: data.date?.day
							? "day"
							: data.date?.month
							? "month"
							: "year",
						value: data.date.day || data.date.month || data.date.year,
					},
					date: `${dateFormated.day}/${dateFormated.month}/${dateFormated.year}`,
				},
			})
			setIsLoading(false)
		} catch (error) {
			ToastAndroid.show("Erro ao consultar finanças", ToastAndroid.SHORT)
		} finally {
			setIsLoading(false)
		}
	}

	return {
		handleConsultFin,
		isLoading,
	}
}
