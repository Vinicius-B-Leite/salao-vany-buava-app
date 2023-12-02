import React from "react"
import { AntDesign } from "@expo/vector-icons"
import { useTheme } from "@shopify/restyle"
import { Text, Box, BoxPressable } from "@/components"
import { months, daysOfWeek } from "@/utlis"

type DateSelectedProps = {
	date: Date
	openCalendar: () => void
}
const DateSelected: React.FC<DateSelectedProps> = ({ date, openCalendar }) => {
	const theme = useTheme()
	const dateFormated = `${daysOfWeek[date.getDay()]}, ${date.getDate()} de ${
		months[date.getMonth()]
	} de ${date.getFullYear()}`
	return (
		<Box flexDirection="row" alignItems="center" gap="s12" mb="s40">
			<BoxPressable onPress={openCalendar}>
				<AntDesign name="calendar" size={24} color={theme.colors.text} />
			</BoxPressable>
			<Text variant="pRegular">{dateFormated} </Text>
		</Box>
	)
}

export default DateSelected
