import React from 'react';
import { Text, TouchableOpacity, View, TextInput, Dimensions } from 'react-native';
import LogoSvg from '../../assets/logo.svg'
import * as S from './styles'



const {width, height} = Dimensions.get('screen')

export default function Login() {
    return (
        <S.Container>
            <LogoSvg width={width / 1.2} height={height / 2.3} />

            <S.InputContainer>
                <S.TextInput>Email</S.TextInput>
                <S.Input/>
            </S.InputContainer>

            <S.InputContainer>
                <S.TextInput>Senha</S.TextInput>
                <S.Input/>
            </S.InputContainer>

            <S.LoginButton>
                <S.TextLoginButton>Entrar</S.TextLoginButton>
            </S.LoginButton>
        </S.Container>
    );
}