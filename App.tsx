import "react-native-gesture-handler"
import React from "react"
import { AuthContextProvider } from "@/contexts/auth"
import { Routes } from "@/routes"
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
