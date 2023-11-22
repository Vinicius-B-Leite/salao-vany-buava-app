import RNDateTimePicker, {
	DateTimePickerEvent,
} from "@react-native-community/datetimepicker"
import React from "react"
import { View } from "react-native"

type HourPickerProps = {
	hour: Date
	setHour: (oldDate: Date) => void
	setShowHourPicker: (oldShow: boolean) => void
}
export default function HourPicker({
	hour,
	setHour,
	setShowHourPicker,
}: HourPickerProps) {
	function onChange(event: DateTimePickerEvent, selectedDate: Date) {
		const currentDate = selectedDate
		setShowHourPicker(false)
		setHour(currentDate)
	}
	return <RNDateTimePicker value={hour} mode="time" onChange={onChange} />
}
