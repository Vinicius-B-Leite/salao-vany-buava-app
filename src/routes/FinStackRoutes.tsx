import { FinType } from "@/models"
import { ConsultFin, ResultFin } from "@/screens"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"

export type FinStackRoutes = {
	ConsultFin: undefined
	ResultFin: {
		finances: FinType[]
		date: string
		category: "pessoal" | "salao"
		searchBy: {
			field: "day" | "month" | "year"
			value: string
		}
	}
}

const Stack = createNativeStackNavigator<FinStackRoutes>()

const FinStackRoutes: React.FC = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="ConsultFin" component={ConsultFin} />
			<Stack.Screen name="ResultFin" component={ResultFin} />
		</Stack.Navigator>
	)
}

export default FinStackRoutes
