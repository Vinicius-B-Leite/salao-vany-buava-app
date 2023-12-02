import { Input, InputProps, BoxPressable } from "@/components"
import React, { useState } from "react"
import { Entypo } from "@expo/vector-icons"
import { useTheme } from "@shopify/restyle"

export const PasswordInput: React.FC<InputProps> = ({ ...rest }) => {
	const [secureText, setSecureText] = useState(true)
	const { colors } = useTheme()
	return (
		<Input
			autoCapitalize="none"
			secureTextEntry={secureText}
			rigthIcon={
				<BoxPressable
					p="s2"
					onPress={() => setSecureText((oldValue) => !oldValue)}>
					<Entypo
						name={secureText ? "eye-with-line" : "eye"}
						size={18}
						color={colors.text}
					/>
				</BoxPressable>
			}
			{...rest}
		/>
	)
}
