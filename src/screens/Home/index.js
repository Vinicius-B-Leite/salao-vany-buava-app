import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import HairSvg from '../../assets/hair.svg';
import NailPolishSvg from '../../assets/nailpolish.svg';
import YeySlashSvg from '../../assets/yeyslash.svg'
import HomeItem from '../../components/HomeItem';

import * as S from './styles'


export default function Home() {

  const data = [
    {
      id: '1',
      type: 'hair',
      cliente: 'Regina',
      hora: '9:30 am',
      procedimento: ['Escova',  'Coloração']
    },

    {
      id: '2',
      type: 'nail',
      cliente: 'Regina',
      hora: '9:30 am',
      procedimento: ['Pé',  'Mão']
    },
    {
      id: '4',
      type: 'eyeslash',
      cliente: 'Regina da silva pereriea',
      hora: '9:30 am',
      procedimento: ['Extenção de cílios']
    },
  
  ]

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