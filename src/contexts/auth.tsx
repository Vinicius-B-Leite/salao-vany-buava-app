import React, { createContext, useEffect, useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/service"

import { emailErros, firebaseAuthErrors, passwordErrors } from "@/utlis/"
import { FirebaseError } from "firebase/app"
import { userService, User } from "@/models"

export type AuthContextProps = {
	isLogged: boolean
	login: (email: string, password: string) => Promise<void>
	errorLogin: {
		email: string
		password: string
	}
	loadingLogin: boolean
	loadingGetUser: boolean
}
export const AuthContext = createContext({} as AuthContextProps)

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null)
	const [errorLogin, setErrorLogin] = useState({ email: "", password: "" })
	const [loadingLogin, setLoadingLogin] = useState(false)
	const [loadingGetUser, setLoadingGetUser] = useState(false)
	useEffect(() => {
		getUser()
	}, [])

	async function getUser() {
		setLoadingGetUser(true)
		const userStorage = await userService.getStorageUser()
		setUser(userStorage)
		setLoadingGetUser(false)
	}

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
			value={{ isLogged: !!user, login, errorLogin, loadingLogin, loadingGetUser }}>
			{children}
		</AuthContext.Provider>
	)
}
