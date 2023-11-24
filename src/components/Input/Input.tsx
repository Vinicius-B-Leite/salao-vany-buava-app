import React, { useRef, useState } from "react"
import { Pressable, TextInput, TextInputProps, View } from "react-native"
import { BoxPressable, Box } from "../Box/Box"
import Text from "../Text/Text"
import { useTheme } from "@shopify/restyle"
import { Theme } from "@/theme"
import { wrapper } from "./style"

export type InputProps = TextInputProps & {
	label?: string
	leftIcon?: React.ReactNode
	rigthIcon?: React.ReactNode
	errorMessage?: string
}

export const Input: React.FC<InputProps> = ({
	label,
	leftIcon,
	rigthIcon,
	errorMessage,
	...rest
}) => {
	const { colors, textVariants } = useTheme<Theme>()
	const inputRef = useRef<TextInput>(null)
	const [isFocus, setIsFocus] = useState(false)

	const focusInput = () => {
		inputRef.current.focus()
	}

	return (
		<Box>
			<BoxPressable
				onPress={focusInput}
				borderColor={errorMessage ? "alert" : isFocus ? "contrast" : "text"}
				backgroundColor={isFocus ? "contrastOpacity" : undefined}
				{...wrapper}>
				{label && (
					<Box
						position="absolute"
						bg="bg"
						paddingHorizontal="s12"
						top={-10}
						left={20}>
						<Text variant="pRegular" textAlign="center">
							{label}
						</Text>
					</Box>
				)}
				<Box
					flex={1}
					flexDirection="row"
					justifyContent="space-between"
					alignItems="center"
					gap="s12">
					{leftIcon}

					<TextInput
						ref={inputRef}
						placeholderTextColor={colors.textSecond}
						onFocus={() => setIsFocus(true)}
						onBlur={() => setIsFocus(false)}
						style={{
							flex: 1,
							...textVariants.pMinimun,
							color: colors.text,
						}}
						{...rest}
					/>
					{rigthIcon}
				</Box>
			</BoxPressable>
			{errorMessage && (
				<Text color="alert" variant="pMinimun" textAlign="left" mt="s12">
					{errorMessage}
				</Text>
			)}
		</Box>
	)
}
