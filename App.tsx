import "react-native-gesture-handler"
import React, { useEffect } from "react"
import AuthContextProvider from "./src/contexts/auth"
import Routes from "./src/routes"
import Login from "./src/screens/Login"
import { StatusBar } from "react-native"

import * as Notifications from "expo-notifications"
import { ThemeProvider } from "@shopify/restyle"
import theme from "@/theme"

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
})

export default function App() {
	return (
		<AuthContextProvider>
			<StatusBar />
			<ThemeProvider theme={theme}>
				<Routes />
			</ThemeProvider>
		</AuthContextProvider>
	)
}
