import React from "react"
import { View } from "react-native"
import { Input, InputProps } from "../Input/Input"
import { Controller, FieldValues, UseControllerProps } from "react-hook-form"
import { PasswordInput } from "../PasswordInput/PasswordInput"

export function FormPasswordInput<T extends FieldValues>({
	name,
	control,
	...rest
}: UseControllerProps<T> & InputProps) {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, value }, fieldState, formState }) => (
				<PasswordInput
					onChangeText={onChange}
					value={value}
					errorMessage={fieldState.error?.message}
					{...rest}
				/>
			)}
		/>
	)
}
