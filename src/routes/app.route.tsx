import React from "react"

import { createDrawerNavigator } from "@react-navigation/drawer"

import { NavigationContainer, NavigatorScreenParams } from "@react-navigation/native"

import { CustomDrawer } from "@/components"
import { CreateFin, NewProceedings, Schedule } from "@/screens"

import AppHomeStack, { AppHomeStackParamslist } from "./appHomeStack"
import { Schedule as ScheduleType } from "@/models"

import FinStackRoutes, { FinStackRoutes as FinStackRoutesType } from "./FinStackRoutes"

export type AppRouteParamsList = {
	ScheduleToday: NavigatorScreenParams<AppHomeStackParamslist>
	ScheduleClient: {
		data?: ScheduleType
	}
	NewProceedings: undefined
	CreateFin: undefined
	FinStackRoutes: NavigatorScreenParams<FinStackRoutesType>
}
const Drawer = createDrawerNavigator<AppRouteParamsList>()

export default function AppRoute() {
	return (
		<NavigationContainer>
			<Drawer.Navigator
				id="drawer"
				drawerContent={(props) => <CustomDrawer {...props} />}
				screenOptions={{
					...drawerStyle,
					unmountOnBlur: true,
				}}
				detachInactiveScreens={false}>
				<Drawer.Screen
					name="ScheduleToday"
					component={AppHomeStack}
					options={{ headerShown: false, drawerLabel: "Atendimentos" }}
				/>
				<Drawer.Screen
					name="ScheduleClient"
					component={Schedule}
					options={{
						drawerLabel: "Agendar Cliente",
						headerTitle: "Agendar Cliente",
					}}
					listeners={({ navigation, route }) => ({
						drawerItemPress: ({ preventDefault }) => {
							preventDefault()
							if (route.name === "ScheduleClient") {
								navigation.navigate("ScheduleClient", {
									params: { data: undefined },
								})
							}
						},
					})}
				/>
				<Drawer.Screen
					name="NewProceedings"
					component={NewProceedings}
					options={{
						drawerLabel: "Criar procedimento",
						headerTitle: "Criar procedimento",
					}}
				/>
				<Drawer.Screen
					name="CreateFin"
					component={CreateFin}
					options={{
						drawerLabel: "Criar Finanças",
						headerTitle: "Criar Finanças",
					}}
				/>
				<Drawer.Screen
					name="FinStackRoutes"
					component={FinStackRoutes}
					options={{
						drawerLabel: "Consultar Finanças",
						headerTitle: "Consultar Finanças",
					}}
				/>
			</Drawer.Navigator>
		</NavigationContainer>
	)
}

export const drawerStyle = {
	headerStyle: {
		backgroundColor: "#0C031E",
	},
	headerTintColor: "#fff",

	drawerActiveBackgroundColor: "#A036F3",
	drawerActiveTintColor: "#fff",

	drawerInactiveBackgroundColor: "#410C6B",
	drawerInactiveTintColor: "#615B5B",

	drawerStyle: {
		backgroundColor: "#070113",
	},
}
