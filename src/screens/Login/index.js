import React, { useContext, useState } from 'react';
import { ActivityIndicator, Dimensions,  TouchableOpacity } from 'react-native';
import LogoSvg from '../../assets/logo.svg'
import * as S from './styles'
import { AuthContext } from '../../contexts/auth'
import { Entypo } from '@expo/vector-icons';


const { width, height } = Dimensions.get('screen')

export default function Login() {

    const { loadingLogin, login, errorLogin } = useContext(AuthContext)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [hidePassword, setHidePassword] = useState(true)


    return (
        <S.Container>
            <LogoSvg width={width / 1.2} height={height / 2.5} />

            {errorLogin && <S.Error>{errorLogin}</S.Error>}
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
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={hidePassword} />

                <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                    {
                        hidePassword ? <Entypo name="eye" size={20} color="#fff" /> : <Entypo name="eye-with-line" size={20} color="#fff" />
                    }
                </TouchableOpacity>
            </S.InputContainer>

            <S.LoginButton onPress={() => login(email, password)}>
                <S.TextLoginButton>{loadingLogin ? <ActivityIndicator size={20} color="#fff"/> : 'Entrar'}</S.TextLoginButton>
            </S.LoginButton>
        </S.Container>
    );
}