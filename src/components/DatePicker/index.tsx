import React from "react"
import DateTimePicker, {
	DateTimePickerEvent,
} from "@react-native-community/datetimepicker"

type DatePickerProps = {
	date: Date
	setDate: (oldDate: Date) => void
	setShowDatePicker: (oldShow: boolean) => void
}
export default function DatePicker({
	date,
	setDate,
	setShowDatePicker,
}: DatePickerProps) {
	function onChange(event: DateTimePickerEvent, selectedDate: Date) {
		const currentDate = selectedDate
		setShowDatePicker(false)
		setDate(currentDate)
	}

	return <DateTimePicker value={date} mode="date" onChange={onChange} />
}
