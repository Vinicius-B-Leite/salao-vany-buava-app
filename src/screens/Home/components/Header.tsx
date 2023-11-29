import { Box, BoxPressable } from "@/components/Box/Box"
import React from "react"
import { View } from "react-native"
import { Entypo } from "@expo/vector-icons"
import { useTheme } from "@shopify/restyle"
import Text from "@/components/Text/Text"
import { DrawerActions, useNavigation } from "@react-navigation/native"

// import { Container } from './styles';

const Header: React.FC = () => {
	const theme = useTheme()
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
