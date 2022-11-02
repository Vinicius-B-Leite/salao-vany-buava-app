import React, { useEffect, useState } from 'react';

import * as S from './styles'
import { AntDesign } from '@expo/vector-icons';

import { ref, remove } from 'firebase/database'
import { db } from '../../../service/firebase'
import { Alert } from 'react-native';

export default function Item({ data: proceeding, setSelectedProceedings, selectedProceedings, type, setProceedings }) {

    const [isSelected, setIsSelected] = useState(false)

    useEffect(() => {
        let keys = selectedProceedings.filter(item => item.id === proceeding.id).map(i => i.id.toString())

        setIsSelected(keys.includes(proceeding.id))

    }, [selectedProceedings])

    function updateSelectedStatus(oldP) {

        if (selectedProceedings.indexOf(proceeding) > -1) {
            let index = selectedProceedings.indexOf(proceeding)
            let array = [...oldP]
            array.splice(index, 1)
            return [...array]
        }

        let newData = proceeding

        newData['selected'] = true
        return [...oldP, newData]

    }

    function deleteItem() {
        Alert.alert(
            'Atenção',
            'Deseja excluir o procedimento ' + proceeding.name + '?',
            [
                {
                    text: 'Confirmar',
                    onPress: () => {
                        remove(ref(db, `procedimentos/${type}/${proceeding.id}`)).then(() => {
                            setProceedings(oldP => {
                                let array = [...oldP]
                                let index = array.indexOf(proceeding)
                                array.splice(index, 1)
                                return array
                            })

                            if (isSelected) {
                                setSelectedProceedings(oldP => {
                                    let array = [...oldP]
                                    let index = array.indexOf(proceeding)
                                    array.splice(index, 1)
                                    return array
                                })
                            }
                        })
                    },
                    style: 'default'
                },

                {
                    text: 'Cancelar',
                    style: 'cancel'
                }
            ]
        )

    }
    return (
        <S.Container onPress={() => setSelectedProceedings(updateSelectedStatus)} onLongPress={() => deleteItem()}>
            <S.Proceeding>{proceeding.name}</S.Proceeding>
            <AntDesign name="checkcircle" size={24} color={isSelected ? '#fff' : '#000'} />
        </S.Container>
    );
}