import React, { createContext, useEffect, useState } from "react";
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'
import { app } from "../service/firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';



export const AuthContext = createContext()

export default function AuthContextProvider({ children }) {

    const [user, setUser] = useState(null)
    const [errorLogin, setErrorLogin] = useState(null)
    const [loadingLogin, setLoadingLogin] = useState(false)

    useEffect(() => {

        async function getUser(){
            const user = await AsyncStorage.getItem('_user')
            if (user) setUser(JSON.parse(user))
        }

        getUser()
    }, [])

    function login(email, password) {
        setLoadingLogin(true)
        signInWithEmailAndPassword(getAuth(app), email, password)
        .then(async() => {
            await AsyncStorage.setItem('_user', JSON.stringify({email, password}))
            setUser({email, password})
            setLoadingLogin(false)
        })
        .catch(error => {
            if (!email && !password) setErrorLogin('Preencha os campos')
            else if (error.code === 'auth/invalid-email') setErrorLogin('Digite um email válido')
            else if (error.code === 'auth/user-not-found') setErrorLogin('Usuário não encontrado')
            else if (error.code === 'auth/wrong-password') setErrorLogin('Senha inválida')
            else if (error.code === 'auth/network-request-failed') setErrorLogin('Falha com a conexão')
            setLoadingLogin(false)
        })
    }

    return (
        <AuthContext.Provider value={{ isLogged: !!user, login, errorLogin, loadingLogin }}>
            {children}
        </AuthContext.Provider>
    )
}