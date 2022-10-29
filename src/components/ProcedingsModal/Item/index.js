import React from 'react';
import { Text, View } from 'react-native';
import * as S from './styles'
import { AntDesign } from '@expo/vector-icons';


export default function Item({ data: proceeding, setProceedings }) {
    const key = Object.keys(proceeding)

    function updateSelectedStatus(oldProceedings){
        let index = oldProceedings.indexOf(proceeding)
        let newArray =  [...oldProceedings]
        newArray[index][key].selected = !newArray[index][key].selected
        return newArray
    }
    return (
        <S.Container onPress={() => setProceedings(updateSelectedStatus)}>
            <S.Proceeding>{proceeding[key]?.nome}</S.Proceeding>
            <AntDesign name="checkcircle" size={24} color={proceeding[key]?.selected ? "#fff" : "#000"} />
        </S.Container>
    );
}