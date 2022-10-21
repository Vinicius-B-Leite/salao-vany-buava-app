import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import HairSvg from '../../assets/hair.svg';
import NailPolishSvg from '../../assets/nailpolish.svg';
import YeySlashSvg from '../../assets/yeyslash.svg'
import HomeItem from '../../components/HomeItem';

import * as S from './styles'
import { child, get } from 'firebase/database';
import { dbRef } from '../../service/firebase';


export default function Home() {

  const [data, setData] = useState([])

  useEffect(()=>{

    get(child(dbRef, 'agenda')).then((snapshot) => {
      if (snapshot.exists()){
        let data = Object.values(snapshot.val()).map(i => i)
        console.log(data[0].cliente)
      }
    })

  }, [])

  return (
    <S.Container>
      <S.Welcome>Olá, Vanny!</S.Welcome>
      <S.DataContainer>
        <AntDesign name="calendar" size={24} color="#fff" />
        <S.Date>Segunda-feira, 10 de outubro de 2022</S.Date>
      </S.DataContainer>
      <FlatList 
        data={data}  
        keyExtractor={item => item.id} 
        renderItem={({item}) => <HomeItem data={item}/>}
        />
    </S.Container>
  );
}