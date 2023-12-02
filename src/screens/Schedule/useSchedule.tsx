import { useState } from "react"
import { ScheduleForm } from "./scheduleSchema"
import { scheduleService, Schedule } from "@/models"
import { useNavigation } from "@react-navigation/native"

type UseScheduleProps = {
	routeParams?: Schedule
	handleReset: () => void
}
export default function useSchedule({ handleReset, routeParams }: UseScheduleProps) {
	const [proceddingsModalVisible, setProccedingsModalVisible] = useState(false)
	const [loading, setLoading] = useState(false)
	const navigation = useNavigation()

	async function submit(data: ScheduleForm) {
		setLoading(true)

		try {
			const { clientName, date, hour, proceedgins, totalValue, type } = data
			const isUpdatading = !!routeParams

			await scheduleService[isUpdatading ? "updateSchedule" : "createSchedule"]({
				clientName,
				date,
				hour,
				proceedingsKeys: proceedgins,
				totalValue: Number(totalValue),
				type: type,
				id: routeParams?.id || "",
			})
			handleReset()
			navigation.reset({
				index: 1,
				routes: [
					{
						name: "ScheduleClient",
						state: undefined,
					},
					{
						name: "ScheduleToday",
					},
				],
			})
		} catch (error) {
			console.log(`submit - Schedule (Screen) - line 70 ${error}`)
		} finally {
			setLoading(false)
		}
	}

	const toggleModal = () => setProccedingsModalVisible((oldV) => !oldV)
	return {
		proceddingsModalVisible,
		loading,
		submit,
		toggleModal,
	}
}
