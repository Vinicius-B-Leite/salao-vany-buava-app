import React from 'react';
import { Text, View } from 'react-native';
import * as S from './styles'
import { AntDesign } from '@expo/vector-icons';


export default function Item({ data: proceeding }) {
    const key = Object.keys(proceeding)
    return (
        <S.Container>
            <S.Proceeding>{proceeding[key].nome}</S.Proceeding>
            <AntDesign name="checkcircle" size={24} color="black" />
        </S.Container>
    );
}