import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import { View } from "react-native"
import Home from "../screens/Home"
import { Schedule } from "../models/Schedule/types"

export type AppHomeStackParamslist = {
	Home: undefined
	UpdateSchedule: {
		data: Schedule
	}
}

const Stack = createNativeStackNavigator<AppHomeStackParamslist>()
const AppHomeStack: React.FC = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
		</Stack.Navigator>
	)
}

export default AppHomeStack
