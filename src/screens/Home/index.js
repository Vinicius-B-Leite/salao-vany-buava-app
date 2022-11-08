import React, { useEffect, useState } from 'react';

import { FlatList, Text, TouchableOpacity } from 'react-native';
import * as S from './styles'

import HomeItem from '../../components/HomeItem';
import DatePicker from '../../components/DatePicker';

import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import { equalTo, onValue, orderByChild, query } from 'firebase/database';
import { dbRef } from '../../service/firebase';

import { format } from 'date-fns'
import { useNavigation } from '@react-navigation/native';


export default function Home() {

  const navigation = useNavigation()

  const [data, setData] = useState([])
  const [date, setDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)
  const dbQuery = query(dbRef, orderByChild('data'), equalTo(format(date, "dd/MM/yyyy")))



  useEffect(() => {

    onValue(dbQuery, (snapshot) => {
      if (snapshot.exists()) {
        setData([])
        let d = snapshot.val()
        let data = Object.values(d).map(i => i)
        data.forEach(item => {
          let newData = {
            cliente: item.cliente,
            data: item.data,
            id: String(item.id),
            procedimento: item.procedimento,
            tipo: item.tipo,
            hora: item.hora,
            valor: item.valor
          }
          setData(oldData => [...oldData, newData])
        })
        setData(oldP => oldP.sort((a,b) => (a.hora > b.hora ? true : -1)))
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
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Entypo name="menu" size={28} color="#fff" />
        </TouchableOpacity>
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