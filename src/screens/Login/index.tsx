import React, { useContext } from "react"

import { Image } from "react-native"
import { AuthContext } from "../../contexts/auth"
import Logo from "@/assets/logo.png"
import Button from "@/components/Button/Button"
import Container from "@/components/Container/Container"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginForm, loginSchema } from "./loginSchema"
import { FormInput } from "@/components/Form/FormInput"
import { FormPasswordInput } from "@/components/Form/FormPasswordInput"
import Spinner from "@/components/Spinner/Spinner"
import { Box } from "@/components/Box/Box"

export default function Login() {
	const { loadingLogin, login, errorLogin, loadingGetUser } = useContext(AuthContext)
	const { control, formState, handleSubmit } = useForm<LoginForm>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
		mode: "all",
	})

	const handleLogin = (data: LoginForm) => {
		login(data.email, data.password)
	}

	if (loadingGetUser) {
		return (
			<Container justifyContent="center" alignItems="center">
				<Spinner size={50} />
			</Container>
		)
	}
	return (
		<Container scrollEnabled alignItems="center">
			<Image source={Logo} />

			<FormInput
				name="email"
				control={control}
				label="Email"
				placeholder="Digite seu email"
				errorMessage={formState.errors.email?.message || errorLogin.email}
			/>

			<FormPasswordInput
				control={control}
				name="password"
				label="Senha"
				placeholder="Digite sua senha"
				errorMessage={formState.errors.password?.message || errorLogin.password}
			/>

			<Button
				title="Entrar"
				disabled={!formState.isValid}
				isLoading={loadingLogin}
				onPress={handleSubmit(handleLogin)}
			/>
		</Container>
	)
}
