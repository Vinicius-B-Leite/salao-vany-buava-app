import React from "react"
import DateTimePicker, {
	DateTimePickerEvent,
} from "@react-native-community/datetimepicker"
import { HourPickerProps } from "../HourPicker"

type DatePickerProps = HourPickerProps
export function DatePicker({ value, onChangeValue, setShow, visible }: DatePickerProps) {
	function onChange(event: DateTimePickerEvent, selectedDate?: Date) {
		if (!selectedDate) return

		const currentDate = selectedDate
		setShow(false)
		onChangeValue(currentDate)
	}

	if (!visible) return null

	return <DateTimePicker value={value} mode="date" onChange={onChange} />
}
