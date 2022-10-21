import React, { createContext, useState } from "react";
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'
import { app } from "../service/firebase";



export const AuthContext = createContext()

export default function AuthContextProvider({ children }) {

    const [isLogged, setIsLogged] = useState(false)
    const [errorLogin, setErrorLogin] = useState(null)

    function login(email, password) {
        signInWithEmailAndPassword(getAuth(app), email, password)
        .catch(error => {
            console.log(error.code)
            if (!email && !password) setErrorLogin('Preencha os campos')
            else if (error.code === 'auth/invalid-email') setErrorLogin('Digite um email válido')
            else if (error.code === 'auth/user-not-found') setErrorLogin('Usuário não encontrado')
            else if (error.code === 'auth/wrong-password') setErrorLogin('Senha inválida')
            else if (error.code === 'auth/network-request-failed') setErrorLogin('Falha com a conexão')
        })
    }

    return (
        <AuthContext.Provider value={{ isLogged, login, errorLogin }}>
            {children}
        </AuthContext.Provider>
    )
}