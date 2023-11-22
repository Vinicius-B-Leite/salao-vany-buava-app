import React, { useContext } from "react"
import { SafeAreaView } from "react-native"
import { AuthContext } from "../contexts/auth"
import AppRoute from "./app.route"
import LoginRoute from "./logig.route"

export default function Routes() {
	const { isLogged } = useContext(AuthContext)

	return isLogged ? <AppRoute /> : <LoginRoute />
}
