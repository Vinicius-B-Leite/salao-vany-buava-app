import { Input, InputProps } from "@/components/Input/Input"
import React, { useState } from "react"
import { Pressable, View } from "react-native"
import { Entypo } from "@expo/vector-icons"
import { useTheme } from "@shopify/restyle"

export const PasswordInput: React.FC<InputProps> = ({ ...rest }) => {
	const [secureText, setSecureText] = useState(false)
	const { colors } = useTheme()
	return (
		<Input
			secureTextEntry={secureText}
			rigthIcon={
				<Pressable onPress={() => setSecureText((oldValue) => !oldValue)}>
					<Entypo
						name={secureText ? "eye-with-line" : "eye"}
						size={24}
						color={colors.text}
					/>
				</Pressable>
			}
			{...rest}
		/>
	)
}
