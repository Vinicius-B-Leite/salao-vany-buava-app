import React from "react"
import { View } from "react-native"
import { Input, InputProps } from "../Input/Input"
import { Controller, FieldValues, UseControllerProps } from "react-hook-form"

export function FormInput<T extends FieldValues>({
	name,
	control,
	...rest
}: UseControllerProps<T> & InputProps) {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, value }, fieldState, formState }) => (
				<Input
					onChangeText={onChange}
					value={value}
					errorMessage={fieldState.error?.message}
					{...rest}
				/>
			)}
		/>
	)
}
