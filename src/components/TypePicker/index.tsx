import React from "react"
import { DimensionValue, View } from "react-native"
import { Picker, PickerProps } from "@react-native-picker/picker"
import { ProceedingsTypes } from "@/models"

type TypePickerProps = PickerProps & {
	selectedType: ProceedingsTypes
	setSelectedType: (oldValue: ProceedingsTypes) => void
	width?: DimensionValue
}
export function TypePicker({
	selectedType,
	setSelectedType,
	width,
	...rest
}: TypePickerProps) {
	return (
		<Picker
			dropdownIconColor={"#fff"}
			dropdownIconRippleColor={"#fff"}
			selectedValue={selectedType}
			style={{ color: "#fff", width: width || "50%" }}
			onValueChange={(itemValue, itemIndex) =>
				setSelectedType(itemValue as ProceedingsTypes)
			}
			{...rest}>
			<Picker.Item label="Cabelo" value="cabelo" />
			<Picker.Item label="Unha" value="unha" />
			<Picker.Item label="Cílios" value="cilios" />
		</Picker>
	)
}
