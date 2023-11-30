import RNDateTimePicker, {
	DateTimePickerEvent,
} from "@react-native-community/datetimepicker"
import React from "react"
import { View } from "react-native"

export type HourPickerProps = {
	value: Date
	onChangeValue: (oldDate: Date) => void
	setShow: (oldShow: boolean) => void
	visible: boolean
}
export default function HourPicker({
	visible,
	value,
	onChangeValue,
	setShow,
}: HourPickerProps) {
	function onChange(event: DateTimePickerEvent, selectedDate?: Date) {
		if (!selectedDate) return
		const currentDate = selectedDate
		setShow(false)
		onChangeValue(currentDate)
	}

	if (!visible) return null
	return <RNDateTimePicker value={value} mode="time" onChange={onChange} />
}
