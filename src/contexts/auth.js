import React, { createContext, useState } from "react";
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'
import { app } from "../service/firebase";



export const AuthContext = createContext()

export default function AuthContextProvider({ children }) {

    const [isLogged, setIsLogged] = useState(false)

    function login(email, password) {
        signInWithEmailAndPassword(getAuth(app), email, password).catch(error => alert(error))
    }

    return (
        <AuthContext.Provider value={{ isLogged, login }}>
            {children}
        </AuthContext.Provider>
    )
}