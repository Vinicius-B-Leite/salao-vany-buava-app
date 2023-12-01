import React, { useEffect, useState } from "react"
import { scheduleService } from "@/models/Schedule/scheduleService"
import { Schedule } from "@/models/Schedule/types"

export function useHome() {
	const [data, setData] = useState<Schedule[]>([])
	const [date, setDate] = useState(new Date())
	const [showDatePicker, setShowDatePicker] = useState(false)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const unsub = scheduleService.getScheduleRealtTime(date, setData, setLoading)

		return unsub
	}, [date])

	const toggleDatePicker = () => setShowDatePicker((oldValue) => !oldValue)
	const onChangeDate = (date: Date) => setDate(date)

	return {
		data,
		date,
		loading,
		showDatePicker,
		toggleDatePicker,
		onChangeDate,
	}
}
