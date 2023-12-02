import { Theme } from "@/theme"
import { useTheme } from "@shopify/restyle"
import React from "react"
import { ActivityIndicator, ActivityIndicatorProps } from "react-native"

type SpinnerProps = ActivityIndicatorProps & {
	color?: keyof Theme["colors"]
	size?: number
}
export const Spinner: React.FC<SpinnerProps> = ({ color = "text", size = 20 }) => {
	const theme = useTheme()
	return <ActivityIndicator color={theme.colors[color]} size={size} />
}
