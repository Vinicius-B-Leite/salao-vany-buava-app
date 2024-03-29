import React from "react"

import { Entypo } from "@expo/vector-icons"

import { Text, Box, BoxPressable } from "@/components"
import { DrawerActions, useNavigation } from "@react-navigation/native"
import { useAppTheme } from "@/hooks"

const Header: React.FC = () => {
	const theme = useAppTheme()
	const navigation = useNavigation()
	return (
		<Box m="s12" flexDirection="row" alignItems="center" gap="s12">
			<BoxPressable onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
				<Entypo name="menu" size={30} color={theme.colors.text} />
			</BoxPressable>
			<Text variant="tRegular">Atendimentos de hoje</Text>
		</Box>
	)
}

export default Header
