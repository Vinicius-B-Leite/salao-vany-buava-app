import React, { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import TypePicker from '../../components/TypePicker';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import DatePicker from '../../components/DatePicker'
import * as S from './styles'
import HourPicker from '../../components/HourPicker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { format } from 'date-fns';
import ProcedingsModal from '../../components/ProcedingsModal';


export default function Schedule() {

  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showHourPicker, setShowHourPicker] = useState(false)
  const [proceddingsModalVisible, setProccedingsModalVisible] = useState(false)

  const [clientName, setClientName] = useState()
  const [selectedType, setSelectedType] = useState('cabelo')
  const [totalValue, setTotalValue] = useState()
  const [date, setDate] = useState(new Date())
  const [hour, setHour] = useState(new Date())


  return (
    <S.Container>
      <S.Main>
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
            <S.Input width="70%" value={format(date, 'H:m')} editable={false} />
          </S.Row>

        </S.Row>


        <TouchableOpacity onPress={() => setProccedingsModalVisible(true)}>
          <S.Row>
            <S.ScheduleTitle>Procedimentos</S.ScheduleTitle>
            <Entypo name="triangle-down" size={24} color="#fff" />
            <S.Underline />
          </S.Row>
        </TouchableOpacity>
        { proceddingsModalVisible &&  <ProcedingsModal
          setProccedingsModalVisible={setProccedingsModalVisible}
          proceddingsModalVisible={proceddingsModalVisible}
          type={selectedType} />}


        <S.Button>
          <S.ButtonText>Agendar</S.ButtonText>
        </S.Button>
      </S.Main>
    </S.Container>
  );
}