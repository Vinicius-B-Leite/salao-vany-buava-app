import React, { createContext, useEffect, useState } from "react"
import { signInWithEmailAndPassword, getAuth } from "firebase/auth"
import { app, auth } from "../service/firebase"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { User } from "../models/User/types"

export type AuthContextProps = {
	isLogged: boolean
	login: (email: string, password: string) => void
	errorLogin: {
		email: string
		password: string
	}
	loadingLogin: boolean
}
export const AuthContext = createContext({} as AuthContextProps)

export default function AuthContextProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null)
	const [errorLogin, setErrorLogin] = useState({ email: "", password: "" })
	const [loadingLogin, setLoadingLogin] = useState(false)

	useEffect(() => {
		async function getUser() {
			const user = await AsyncStorage.getItem("_user")
			if (user) setUser(JSON.parse(user))
		}

		getUser()
	}, [])

	function login(email: string, password: string) {
		setLoadingLogin(true)
		signInWithEmailAndPassword(auth, email, password)
			.then(async () => {
				await AsyncStorage.setItem("_user", JSON.stringify({ email, password }))
				setUser({ email, password })
				setLoadingLogin(false)
			})
			.catch((error) => {
				console.log(error.code)

				// setErrorLogin({ email: "", password: "" })
				if (["auth/invalid-email", "auth/user-not-found"].includes(error.code))
					setErrorLogin((oldError) => ({
						...oldError,
						email: "Usuário não encontrado",
					}))
				else if (error.code === "auth/wrong-password")
					setErrorLogin((oldError) => ({
						...oldError,
						password: "Senha errada",
					}))

				setLoadingLogin(false)
			})
	}

	return (
		<AuthContext.Provider
			value={{ isLogged: !!user, login, errorLogin, loadingLogin }}>
			{children}
		</AuthContext.Provider>
	)
}
