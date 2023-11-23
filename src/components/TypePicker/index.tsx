import React from "react"
import { View } from "react-native"
import { Picker } from "@react-native-picker/picker"
import { ProceedingsTypes } from "../../models/Proceedings/types"

type TypePickerProps = {
	selectedType: ProceedingsTypes
	setSelectedType: (oldValue: ProceedingsTypes) => void
	width?: number | string
}
export default function TypePicker({
	selectedType,
	setSelectedType,
	width,
}: TypePickerProps) {
	return (
		<Picker
			style={{ color: "#fff", width: width || "40%" }}
			dropdownIconColor={"#fff"}
			dropdownIconRippleColor={"#fff"}
			selectedValue={selectedType}
			onValueChange={(itemValue, itemIndex) => setSelectedType(itemValue)}>
			<Picker.Item label="Cabelo" value="cabelo" />
			<Picker.Item label="Unha" value="unha" />
			<Picker.Item label="Cílios" value="cilios" />
		</Picker>
	)
}
