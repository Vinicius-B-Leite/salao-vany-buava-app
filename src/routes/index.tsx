import React, { useContext } from "react"
import { SafeAreaView } from "react-native"
import { AuthContext } from "../contexts/auth"
import AppRoute from "./app.route"
import LoginRoute from "./logig.route"
import { useTheme as useNavigationTheme } from "@react-navigation/native"
import { useTheme } from "@shopify/restyle"

export default function Routes() {
	const { isLogged } = useContext(AuthContext)
	const theme = useTheme()
	const navigationTheme = useNavigationTheme()
	navigationTheme.colors.background = theme.colors.bg
	return isLogged ? <AppRoute /> : <LoginRoute />
}
