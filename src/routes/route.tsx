import React, { useContext } from "react"

import { AuthContext } from "@/contexts"
import AppRoute from "./app.route"
import LoginRoute from "./logig.route"
import { useTheme as useNavigationTheme } from "@react-navigation/native"

import { useAppTheme } from "@/hooks"

export function Routes() {
	const { isLogged } = useContext(AuthContext)
	const theme = useAppTheme()
	const navigationTheme = useNavigationTheme()
	navigationTheme.colors.background = theme.colors.bg
	return isLogged ? <AppRoute /> : <LoginRoute />
}
