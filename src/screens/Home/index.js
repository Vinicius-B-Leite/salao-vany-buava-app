import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import HomeItem from '../../components/HomeItem';
import { Entypo } from '@expo/vector-icons';
import * as S from './styles'

import { child, equalTo, get, onValue, orderByChild, query, ref } from 'firebase/database';
import { db, dbRef } from '../../service/firebase';
import { format } from 'date-fns'
import DatePicker from '../../components/DatePicker';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function Home() {

  const [data, setData] = useState([])
  const [date, setDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)
  const dbQuery = query(dbRef, orderByChild('data'), equalTo(format(date, "dd/MM/yyyy")))



  useEffect(() => {

    onValue(dbQuery, (snapshot) => {
      if (snapshot.exists()) {
        setData([])
        let data = Object.values(snapshot.val()).map(i => i)
        data.forEach(item => {
          let newData = {
            cliente: item.cliente,
            data: item.data,
            id: String(item.id),
            procedimento: Object.values(item.procedimento),
            tipo: item.tipo,
            hora: item.hora,
            valor: item.valor
          }
          setData(oldData => [...oldData, newData])
        })
      } else setData([])
    })

  }, [date])


  function getWeekDayName() {
    let days = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']
    return days[date.getDay()]
  }

  function getMothName() {
    let months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    return months[date.getMonth()]
  }
  return (
    <>
      <S.Header>
        <Entypo name="menu" size={28} color="#fff" />
        <S.Title>Atendimentos de hoje</S.Title>
      </S.Header>
      <S.Container>
        <S.Welcome>Olá, Vanny!</S.Welcome>
        <S.DataContainer>
          <TouchableOpacity onPress={() => setShowDatePicker(!showDatePicker)}>
            <AntDesign name="calendar" size={24} color="#fff" />
          </TouchableOpacity>
          <S.Date>{getWeekDayName()}, {date.getDate()} de {getMothName()} de {date.getFullYear()}</S.Date>
        </S.DataContainer>

        {
          data.length > 0 ?
            <FlatList
              style={{ marginTop: '7%' }}
              data={data}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <HomeItem data={item} />} />
            :
            <Text style={{ color: '#fc1303', textAlign: 'center', marginTop: '10%' }}>Não teve clientes agendadas este dia</Text>
        }


        {showDatePicker && <DatePicker date={date} setDate={setDate} setShowDatePicker={setShowDatePicker} />}
      </S.Container>
    </>
  );
}