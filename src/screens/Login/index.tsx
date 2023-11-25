import React, { useContext, useState } from "react"

import { ActivityIndicator, Dimensions, Image, TouchableOpacity } from "react-native"
import * as S from "./styles"
import { AuthContext } from "../../contexts/auth"
import { Entypo } from "@expo/vector-icons"
import Logo from "@/assets/logo.png"
import { Input } from "@/components/Input/Input"
import Icon from "@/components/Icon/Icon"
import { PasswordInput } from "@/components/PasswordInput/PasswordInput"
import Button from "@/components/Button/Button"

const { width, height } = Dimensions.get("screen")

export default function Login() {
	const { loadingLogin, login, errorLogin } = useContext(AuthContext)
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	return (
		<S.Container style={{ padding: "20%" }}>
			<Image source={Logo} />

			{errorLogin && <S.Error>{errorLogin}</S.Error>}

			<Input label="Email" placeholder="Digite seu email" />

			<PasswordInput label="Senha" placeholder="Digite sua senha" />

			<Button title="Entrar" disabled onPress={() => console.log("clicou")} />
		</S.Container>
	)
}
