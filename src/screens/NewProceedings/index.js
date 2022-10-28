import React, { useState } from 'react';
import { ActivityIndicator, SafeAreaView, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import TypePicker from '../../components/TypePicker'
import * as S from './styles'
import { push, ref, set } from 'firebase/database'
import { db } from '../../service/firebase'
import { Error } from '../Schedule/styles'

export default function NewProceedings() {

    const [selectedType, setSelectedType] = useState('cabelo')
    const [proceedingsName, setProceedingsName] = useState()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState()

    function submit() {
        setLoading(true)
        if (!selectedType || !proceedingsName){
            setLoading(false)
            setErrorMessage('Preencha todos os campos')
            return
        }
        const refProcedimento = ref(db, 'procedimentos/' + selectedType)
        const newKey = push(refProcedimento)
        set(newKey, {nome: proceedingsName}).finally(() => {
            setErrorMessage('')
            setProceedingsName('')
            setLoading(false)
        })
    }

    return (
        <S.Container>
            {errorMessage && <Error>{errorMessage}</Error>}
            <S.Input
                placeholder='Nome do procedimento'
                value={proceedingsName}
                onChangeText={(txt) => setProceedingsName(txt)}
            />

            <TypePicker selectedType={selectedType} setSelectedType={setSelectedType} width='100%' />

            <S.Button onPress={() => submit()}>
                <S.TextButton>{loading ? <ActivityIndicator size={24} color='#FFF'/> : 'Cadastrar'}</S.TextButton>
            </S.Button>
        </S.Container>
    );
}