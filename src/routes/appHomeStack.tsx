import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import { View } from "react-native"
import Home from "../screens/Home"
import UpdateSchedule from "../screens/UpdateProcedings"
import { Schedule } from "../models/Schedule/types"

type AppHomeStackParamslist = {
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
			<Stack.Screen
				name="UpdateSchedule"
				component={UpdateSchedule}
				options={{
					headerStyle: { backgroundColor: "#0C031E" },
					headerTintColor: "#fff",
				}}
			/>
		</Stack.Navigator>
	)
}

export default AppHomeStack
