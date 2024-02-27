import { finService } from "@/models"
import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import { Alert } from "react-native"
import { useConsultFin } from "../ConsultFin/usseConsultFin"

export function useResultFin() {
	const [activity, setActivity] = useState<"Entrada" | "Saída">("Entrada")
	const { handleConsultFin } = useConsultFin()
	const toogleActivity = () =>
		setActivity((oldAct) => (oldAct === "Entrada" ? "Saída" : "Entrada"))

	const handleDeleteFin = (
		id: string,
		category: "pessoal" | "salao",
		date: { day: string; month: string; year: string }
	) => {
		Alert.alert(
			"AtençÃo",
			"Deseja realmente excluir?Essa ação não pode ser desfeita",
			[
				{
					text: "Cancelar",
					style: "cancel",
				},
				{
					text: "Excluir",
					onPress: async () => {
						await finService.deleteFin(id)
						handleConsultFin({
							category: category,
							date: date,
						})
					},
				},
			]
		)
	}
	return {
		activity,
		toogleActivity,
		handleDeleteFin,
	}
}
