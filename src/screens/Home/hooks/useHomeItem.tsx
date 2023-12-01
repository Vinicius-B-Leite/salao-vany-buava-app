import { proceedingsService } from "@/models/Proceedings/proceedingsService"
import { scheduleService } from "@/models/Schedule/scheduleService"
import { Schedule } from "@/models/Schedule/types"
import { useNavigation } from "@react-navigation/native"
import { useEffect, useState } from "react"
import { Alert } from "react-native"

export function useHomeItem(data: Schedule) {
	const [proceedings, setProceedings] = useState<string[]>([])
	const navigation = useNavigation()

	useEffect(() => {
		getProceedingsName()
	}, [data])

	function getProceedingsName() {
		let p = data?.proceedingsKeys

		setProceedings([])
		p?.forEach(async (item) => {
			const proceedings = await proceedingsService.getSingleProceeding(
				item,
				data.type
			)
			if (!proceedings) return
			let proceedingsName = Object.values(proceedings).toString()
			function toCapitalize(str: string) {
				return str.charAt(0).toUpperCase() + str.slice(1)
			}
			setProceedings((oldP) => [...oldP, toCapitalize(proceedingsName)])
		})
	}
	function handleRemove() {
		Alert.alert(
			"Excluir agendamento",
			`Você deseja excluir o agendamento da ${data.clientName}?`,
			[
				{
					text: "Excluir",
					onPress: () => scheduleService.deleteSchedule(data.id),
				},
				{ text: "Cancelar", style: "cancel" },
			]
		)
	}
	function handleNavigateToUpdateSchedule() {
		const newDate = new Date(data.date)

		const [day, month, year] = data.date.toString().split("/")

		newDate.setFullYear(Number(year), Number(month) - 1, Number(day))

		navigation.navigate("ScheduleClient", { data: { ...data, date: newDate } })
	}

	return {
		proceedings,
		handleRemove,
		handleNavigateToUpdateSchedule,
	}
}
