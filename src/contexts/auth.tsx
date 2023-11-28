import React, { createContext, useEffect, useState } from "react"
import { signInWithEmailAndPassword, getAuth, AuthErrorCodes } from "firebase/auth"
import { app, auth } from "../service/firebase"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { User } from "../models/User/types"
import {
	emailErros,
	firebaseAuthErrors,
	passwordErrors,
} from "@/utlis/firebaseAuthErrors"
import { FirebaseError } from "firebase/app"
import { userService } from "@/models/User/userService"

export type AuthContextProps = {
	isLogged: boolean
	login: (email: string, password: string) => Promise<void>
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
		userService.getStorageUser().then((user) => user && setUser(user))
	}, [])

	async function login(email: string, password: string) {
		setLoadingLogin(true)
		setErrorLogin({ email: "", password: "" })
		try {
			await signInWithEmailAndPassword(auth, email, password)
			setUser({ email, password })
			await userService.setStorageUser({ email, password })
		} catch (error) {
			if (!(error instanceof FirebaseError)) return
			const errorCode = error.code as keyof typeof firebaseAuthErrors
			const isHandlerError = Object.keys(firebaseAuthErrors).includes(errorCode)
			if (isHandlerError) {
				const isemailError = Object.keys(emailErros).includes(errorCode)
				if (isemailError)
					setErrorLogin({ password: "", email: firebaseAuthErrors[errorCode] })
				const isPasswordError = Object.keys(passwordErrors).includes(errorCode)
				if (isPasswordError)
					setErrorLogin({ password: firebaseAuthErrors[errorCode], email: "" })
			}
		} finally {
			setLoadingLogin(false)
		}
	}

	return (
		<AuthContext.Provider
			value={{ isLogged: !!user, login, errorLogin, loadingLogin }}>
			{children}
		</AuthContext.Provider>
	)
}
