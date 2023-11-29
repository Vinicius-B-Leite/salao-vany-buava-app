import React from "react"
import DateTimePicker, {
	DateTimePickerEvent,
} from "@react-native-community/datetimepicker"

type DatePickerProps = {
	date: Date
	setDate: (oldDate: Date) => void
	setShowDatePicker: (oldShow: boolean) => void
	visible: boolean
}
export default function DatePicker({
	date,
	setDate,
	setShowDatePicker,
	visible,
}: DatePickerProps) {
	function onChange(event: DateTimePickerEvent, selectedDate?: Date) {
		if (!selectedDate) return

		const currentDate = selectedDate
		setShowDatePicker(false)
		setDate(currentDate)
	}

	if (!visible) return null

	return <DateTimePicker value={date} mode="date" onChange={onChange} />
}
