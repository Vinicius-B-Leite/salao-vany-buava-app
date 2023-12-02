import React, { forwardRef, useRef, useState } from "react"
import { TextInput, TextInputProps } from "react-native"
import { BoxPressable, Box, Text, BoxType } from "@/components"
import { useTheme } from "@shopify/restyle"
import { Theme } from "@/theme"
import { wrapper } from "./style"

export type InputProps = TextInputProps & {
	label?: string
	leftIcon?: React.ReactNode
	rigthIcon?: React.ReactNode
	errorMessage?: string
	boxProps?: BoxType
}

export const Input = forwardRef<TextInput, InputProps>(
	({ label, leftIcon, rigthIcon, errorMessage, boxProps, ...rest }, ref) => {
		const { colors, textVariants } = useTheme<Theme>()
		const inputRef = useRef<TextInput>(null)
		const [isFocus, setIsFocus] = useState(false)

		const focusInput = () => {
			inputRef?.current?.focus()
		}

		return (
			<Box>
				<BoxPressable
					onPress={focusInput}
					borderColor={errorMessage ? "alert" : isFocus ? "contrast" : "text"}
					backgroundColor={isFocus ? "contrastOpacity" : undefined}
					{...wrapper}
					{...boxProps}>
					{label && (
						<Box
							position="absolute"
							bg="bg"
							paddingHorizontal="s12"
							top={-15}
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
							ref={ref || inputRef}
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
)
