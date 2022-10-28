import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import TypePicker from '../../components/TypePicker'
import * as S from './styles'
import { push, ref, set } from 'firebase/database'
import { db } from '../../service/firebase'


export default function NewProceedings() {

    const [selectedType, setSelectedType] = useState('cabelo')
    const [proceedingsName, setProceedingsName] = useState()

    function submit() {
        const refProcedimento = ref(db, 'procedimentos/' + selectedType)
        const newKey = push(refProcedimento)
        set(newKey, {nome: proceedingsName})
    }

    return (
        <S.Container>
            <S.Input
                placeholder='Nome do procedimento'
                value={proceedingsName}
                onChangeText={(txt) => setProceedingsName(txt)}
            />

            <TypePicker selectedType={selectedType} setSelectedType={setSelectedType} width='100%' />

            <S.Button onPress={() => submit()}>
                <S.TextButton>Cadastrar</S.TextButton>
            </S.Button>
        </S.Container>
    );
}