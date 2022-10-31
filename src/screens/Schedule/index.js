import React, { useEffect, useState } from 'react';

import { ActivityIndicator, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import * as S from './styles'

import DatePicker from '../../components/DatePicker'
import HourPicker from '../../components/HourPicker';
import TypePicker from '../../components/TypePicker';
import ProcedingsModal from '../../components/ProcedingsModal';

import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import { db, dbRef } from '../../service/firebase'
import { child, get, push, ref, set } from 'firebase/database';

import { format } from 'date-fns';






export default function Schedule() {

  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showHourPicker, setShowHourPicker] = useState(false)
  const [proceddingsModalVisible, setProccedingsModalVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState()
  const [loading, setLoading] = useState(false)

  const [clientName, setClientName] = useState()
  const [selectedType, setSelectedType] = useState('cabelo')
  const [totalValue, setTotalValue] = useState()
  const [date, setDate] = useState(new Date())
  const [hour, setHour] = useState(new Date())
  const [selectedProceedings, setSelectedProceedings] = useState([])



  function submit() {
    setLoading(true)
    if (!clientName || !selectedType || !totalValue || !date || !hour || !proceedings) {
      setErrorMessage('Preencha todos os campos')
      setLoading(false)
      return
    }

    let newKey = push(dbRef)

    let keysSelected = proceedings.filter(item => item.selected == true).map(item => (item.id))

    set(newKey, {
      cliente: clientName,
      data: format(date, 'dd/MM/yyyy'),
      hora: format(date, 'HH:mm'),
      tipo: selectedType,
      valor: totalValue,
      id: newKey.toString().slice(60, newKey.length),
      procedimento: keysSelected
    }).finally(() => {
      setLoading(false)
      setClientName('')
      setTotalValue('')
    })

  }
  console.log(selectedProceedings)

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
              value={totalValue}
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
          <ProcedingsModal
            setProccedingsModalVisible={setProccedingsModalVisible}
            proceddingsModalVisible={proceddingsModalVisible}
            type={selectedType}
            selectedProceedings={selectedProceedings}
            setSelectedProceedings={setSelectedProceedings} />


          <S.Button onPress={() => submit()}>
            <S.ButtonText>{loading ? <ActivityIndicator color='#fff' size={24} /> : 'Agendar'}</S.ButtonText>
          </S.Button>
        </S.Main>
      </S.Container>
    </KeyboardAvoidingView>
  );
}