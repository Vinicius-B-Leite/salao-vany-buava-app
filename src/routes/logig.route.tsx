import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import { Login } from "@/screens"

export type LoginRouteParamsList = {
	Login: undefined
}
const Stack = createNativeStackNavigator<LoginRouteParamsList>()

export default function LoginRoute() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Login"
					component={Login}
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}
