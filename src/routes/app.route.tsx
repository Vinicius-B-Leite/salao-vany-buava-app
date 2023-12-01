import React from "react"
import { SafeAreaView, View } from "react-native"
import {
	DrawerNavigationProp,
	DrawerScreenProps,
	createDrawerNavigator,
} from "@react-navigation/drawer"
import Home from "../screens/Home"
import { NavigationContainer, NavigatorScreenParams } from "@react-navigation/native"
import Schedule from "../screens/Schedule"
import CustomDrawer from "../components/CustomDrawer"
import NewProceedings from "../screens/NewProceedings"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import UpdateProcedings from "../screens/UpdateProcedings"
import { SafeAreaProvider } from "react-native-safe-area-context"
import AppHomeStack, { AppHomeStackParamslist } from "./appHomeStack"
import { Schedule as ScheduleType } from "@/models/Schedule/types"

export type AppRouteParamsList = {
	ScheduleToday: NavigatorScreenParams<AppHomeStackParamslist>
	ScheduleClient: {
		data?: ScheduleType
	}
	NewProceedings: undefined
}
const Drawer = createDrawerNavigator<AppRouteParamsList>()

export default function AppRoute() {
	return (
		<NavigationContainer>
			<Drawer.Navigator
				drawerContent={(props) => <CustomDrawer {...props} />}
				screenOptions={{
					...drawerStyle,
					unmountOnBlur: true,
				}}>
				<Drawer.Screen
					name="ScheduleToday"
					component={AppHomeStack}
					options={{ headerShown: false }}
				/>
				<Drawer.Screen name="ScheduleClient" component={Schedule} />
				<Drawer.Screen name="NewProceedings" component={NewProceedings} />
			</Drawer.Navigator>
		</NavigationContainer>
	)
}

const drawerStyle = {
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
