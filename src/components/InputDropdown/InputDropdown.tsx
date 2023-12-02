import React from "react"

import { Box, BoxPressable, BoxPressableProps, Text, Icon } from "@/components"

type InputDropdownProps = BoxPressableProps & {
	title: string
}

export const InputDropdown: React.FC<InputDropdownProps> = ({ title, ...rest }) => {
	return (
		<BoxPressable {...rest}>
			<Box flexDirection="row" justifyContent="space-between">
				<Text variant="pRegular">{title}</Text>
				<Icon name="triangle" size={17} />
			</Box>
			<Box bg="text" height={2} mt="s12" />
		</BoxPressable>
	)
}
