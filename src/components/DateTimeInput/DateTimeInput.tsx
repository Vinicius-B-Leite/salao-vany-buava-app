import React, { useState } from "react"
import { TouchableOpacity, View } from "react-native"
import { Box, BoxPressable } from "../Box/Box"

import { Entypo, Feather } from "@expo/vector-icons"
import { Input } from "../Input/Input"
import { format } from "date-fns"
import { Controller, FieldValues, UseControllerProps } from "react-hook-form"
import { DatePicker } from "@/components"
import HourPicker from "../HourPicker"

type DateTimeInputProps = {
	type: "date" | "time"
}
export function DateTimeInput<T extends FieldValues>({
	name,
	control,
	type,
}: UseControllerProps<T> & DateTimeInputProps) {
	const [visible, setVisible] = useState(false)
	const Picker = type === "date" ? DatePicker : HourPicker
	const formatMode = type === "date" ? "dd/MM/yyyy" : "HH:mm"
	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<BoxPressable
					flexDirection="row"
					alignItems="center"
					gap="s12"
					onPress={() => setVisible(!visible)}>
					{type === "date" ? (
						<Entypo name="calendar" size={24} color="#fff" />
					) : (
						<Feather name="clock" size={24} color="#fff" />
					)}

					<Input
						placeholder="Data"
						value={format(field.value, formatMode)}
						editable={false}
						boxProps={{
							width: 100,
							marginTop: "s2",
						}}
					/>
					<Picker
						visible={visible}
						value={field.value}
						onChangeValue={field.onChange}
						setShow={setVisible}
					/>
				</BoxPressable>
			)}
		/>
	)
}
