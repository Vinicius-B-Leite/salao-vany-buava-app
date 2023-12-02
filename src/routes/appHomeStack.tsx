import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import { Home } from "@/screens"
import { Schedule } from "@/models"

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
