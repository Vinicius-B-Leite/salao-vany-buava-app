import React from "react"
import { DimensionValue, View } from "react-native"
import { Picker, PickerProps } from "@react-native-picker/picker"
import { ProceedingsTypes } from "@/models"

type TypePickerProps<T> = PickerProps & {
	selectedType: T
	setSelectedType: (oldValue: T) => void
	width?: DimensionValue
	options: { label: string; value: T }[]
}
export function TypePicker<T extends number | string>({
	selectedType,
	setSelectedType,
	width,
	options,
	...rest
}: TypePickerProps<T>) {
	return (
		<Picker
			dropdownIconColor={"#fff"}
			dropdownIconRippleColor={"#fff"}
			selectedValue={selectedType}
			style={{ color: "#fff", width: width || "50%" }}
			onValueChange={(itemValue) => setSelectedType(itemValue as T)}
			{...rest}>
			{options.map((option) => (
				<Picker.Item label={option.label} value={option.value} />
			))}
		</Picker>
	)
}
