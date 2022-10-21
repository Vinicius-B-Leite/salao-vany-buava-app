import React, { useContext, useState } from 'react';
import {  Dimensions } from 'react-native';
import LogoSvg from '../../assets/logo.svg'
import * as S from './styles'
import { AuthContext } from '../../contexts/auth'


const { width, height } = Dimensions.get('screen')

export default function Login() {

    const { isLogged, login } = useContext(AuthContext)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    return (
        <S.Container>
            <LogoSvg width={width / 1.2} height={height / 2.4} />

            <S.InputContainer>
                <S.TextInput>Email</S.TextInput>
                <S.Input
                    value={email}
                    onChangeText={(text) => setEmail(text)} />
            </S.InputContainer>

            <S.InputContainer>
                <S.TextInput>Senha</S.TextInput>
                <S.Input
                    value={password}
                    onChangeText={(text) => setPassword(text)} />
            </S.InputContainer>

            <S.LoginButton onPress={() => login(email, password)}>
                <S.TextLoginButton>Entrar</S.TextLoginButton>
            </S.LoginButton>
        </S.Container>
    );
}