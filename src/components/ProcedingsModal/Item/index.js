import React, { useEffect, useState } from 'react';

import * as S from './styles'

import { AntDesign } from '@expo/vector-icons';


export default function Item({ data: proceeding, setSelectedProceedings, selectedProceedings, setProceedings }) {

    const [isSelected, setIsSelected] = useState(false)

    useEffect(()=>{
        let keys = selectedProceedings.filter(item => item.id === proceeding.id).map(i => i.id.toString())

        setIsSelected(keys.includes(proceeding.id))
        
    }, [selectedProceedings])

    function updateSelectedStatus(oldP) {

        if (selectedProceedings.indexOf(proceeding) > -1 ){
            let index = selectedProceedings.indexOf(proceeding)
            let array = [...oldP]
            array.splice(index, 1)
            return [...array]
        }

        let newData = proceeding

        newData['selected'] =  true
        return [...oldP, newData]
        
    }
    return (
        <S.Container onPress={() => setSelectedProceedings(updateSelectedStatus)}>
            <S.Proceeding>{proceeding.name}</S.Proceeding>
            <AntDesign name="checkcircle" size={24} color={isSelected ? '#fff' : '#000'} />
        </S.Container>
    );
}