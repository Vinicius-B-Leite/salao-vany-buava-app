import React from 'react';

import * as S from './styles'

import { AntDesign } from '@expo/vector-icons';


export default function Item({ data: proceeding, setProceedings }) {

    function updateSelectedStatus(oldP) {
        let newData = [...oldP]
        let newStatus = !proceeding.selected
        let data = {
            id: proceeding.id,
            name: proceeding.name,
            selected: newStatus
        }
        let index = newData.indexOf(proceeding)
        newData[index] = data
        return newData
    }
    return (
        <S.Container onPress={() => setProceedings(updateSelectedStatus)}>
            <S.Proceeding>{proceeding.name}</S.Proceeding>
            <AntDesign name="checkcircle" size={24} color={proceeding.selected ? '#fff' : '#000'} />
        </S.Container>
    );
}