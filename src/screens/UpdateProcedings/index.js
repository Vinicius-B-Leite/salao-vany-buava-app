import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, TouchableOpacity, View } from 'react-native';
import DatePicker from '../../components/DatePicker';
import HourPicker from '../../components/HourPicker';
import TypePicker from '../../components/TypePicker';
import { Feather } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'

import * as S from '../Schedule/styles'
import { format } from 'date-fns';
import ProcedingsModal from '../../components/ProcedingsModal';
import { child, get, ref, update } from 'firebase/database';
import { db } from '../../service/firebase';

export default function UpdateProcedings() {
    const navigation = useNavigation()
    const params = useRoute().params.data

    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showHourPicker, setShowHourPicker] = useState(false)
    const [proceddingsModalVisible, setProccedingsModalVisible] = useState(false)
    const [errorMessage, setErrorMessage] = useState()
    const [loading, setLoading] = useState(false)

    const [clientName, setClientName] = useState(params.cliente)
    const [selectedType, setSelectedType] = useState(params.tipo)
    const [totalValue, setTotalValue] = useState(params.valor)
    const [date, setDate] = useState(new Date(`${params.data.slice(6)}/${params.data.slice(3, 5)}/${params.data.slice(0, 2)}`))
    const [hour, setHour] = useState(new Date(null, null, null, params.hora.slice(0, 2), params.hora.slice(3)))

    var proceedingsKeys = params.procedimento
    const [proceedings, setProceedings] = useState([])

    useEffect(() => {
        navigation.setOptions({ headerTitle: clientName })


        get(child(ref(db), `procedimentos/${selectedType}`)).then(snapshot => {
            let data = [snapshot.val()]

            data.forEach(item => {
                let key = Object.keys(item)
                key.forEach(k => {
                    item[k]['selected'] = proceedingsKeys.includes(k) ? true : false
                    let d = {}
                    d[k] = item[k]

                    setProceedings(oldP => [...oldP, d])
                })
            })

        })
    }, [selectedType])

    function updateShedule() {

        function selectedObjectKeys() {
            let selectedsProceedingsArray = proceedings.filter(item => Object.values(item)[0].selected === true)
            let keys = selectedsProceedingsArray.map(item => Object.keys(item).toString())
            let selectedsProceedingsObject = Object.assign({}, keys)
            return selectedsProceedingsObject
        }

        update(ref(db, `agenda/${params.id}`), {
            cliente: clientName,
            data: format(date, 'dd/MM/yyyy'),
            hora: format(hour, 'HH:mm'),
            id: params.id,
            procedimento: selectedObjectKeys(),
            tipo: selectedType,
            valor: totalValue
        })
    }
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} enabled={false}>
            <S.Container>
                <S.Main>
                    {errorMessage && <S.Error>{errorMessage}</S.Error>}
                    <S.Input placeholder='Nome da cliente' value={clientName} onChangeText={txt => setClientName(txt)} />

                    <S.Row>
                        <TypePicker selectedType={selectedType} setSelectedType={setSelectedType} />
                        <S.Input
                            placeholder='Valor'
                            width='50%'
                            value={Number(totalValue).toFixed(2).replace('.', ',')}
                            onChangeText={txt => setTotalValue(txt)}
                            keyboardType="numeric" />
                    </S.Row>


                    <S.Row>

                        <S.Row width="45%">
                            <TouchableOpacity onPress={() => setShowDatePicker(!showDatePicker)}>
                                <Entypo name="calendar" size={24} color="#fff" />
                            </TouchableOpacity>
                            <S.Input
                                placeholder="Data"
                                width="70%"
                                value={format(date, 'dd/MM/yyyy')}
                                editable={false} />
                            {showDatePicker && <DatePicker date={date} setDate={setDate} setShowDatePicker={setShowDatePicker} />}
                        </S.Row>

                        <S.Row width="45%">
                            <TouchableOpacity onPress={() => setShowHourPicker(!showHourPicker)}>
                                <Feather name="clock" size={24} color="#fff" />
                            </TouchableOpacity>
                            {showHourPicker && <HourPicker hour={hour} setHour={setHour} setShowHourPicker={setShowHourPicker} />}
                            <S.Input width="70%" value={format(hour, 'HH:mm')} editable={false} />
                        </S.Row>

                    </S.Row>


                    <TouchableOpacity onPress={() => setProccedingsModalVisible(true)}>
                        <S.Row>
                            <S.ScheduleTitle>Procedimentos</S.ScheduleTitle>
                            <Entypo name="triangle-down" size={24} color="#fff" />
                            <S.Underline />
                        </S.Row>
                    </TouchableOpacity>
                    {proceddingsModalVisible && <ProcedingsModal
                        setProccedingsModalVisible={setProccedingsModalVisible}
                        proceddingsModalVisible={proceddingsModalVisible}
                        type={selectedType}
                        proceedings={proceedings}
                        setProceedings={setProceedings}
                        cType={selectedType} />}


                    <S.Button onPress={() => updateShedule()}>
                        <S.ButtonText>{loading ? <ActivityIndicator color='#fff' size={24} /> : 'Salvar'}</S.ButtonText>
                    </S.Button>
                </S.Main>
            </S.Container>
        </KeyboardAvoidingView>
    );
}