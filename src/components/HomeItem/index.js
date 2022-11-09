import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Dimensions, Text, View, TouchableWithoutFeedback, FlatList } from 'react-native';
import * as S from './styles'

import HairSvg from '../../assets/hair.svg';
import NailSvg from '../../assets/nailpolish.svg'
import Eyeslash from '../../assets/yeyslash.svg'

import { child, get, ref, remove } from 'firebase/database';
import { db } from '../../service/firebase';



const { width, height } = Dimensions.get('screen')

export default function HomeItem({ data }) {

    const [proceedings, setProceedings] = useState([])
    const navigation = useNavigation()

    useEffect(() => {

        function getProceedingsName() {
            let p = data?.procedimento
            setProceedings([])
            p?.forEach(item => {
                get(child(ref(db), `procedimentos/${data?.tipo}/${item}`)).then(snapshot => {
                    if (snapshot.exists()) {
                        let proceedingsName = Object.values(snapshot.val()).toString()
                        function toCapitalize(str){
                            return str.charAt(0).toUpperCase() + str.slice(1)
                        }
                        setProceedings(oldP => [...oldP, toCapitalize(proceedingsName)])
                    }
                })
            })
        }
        getProceedingsName()
    }, [data])

    function choseSvg() {
        if (data.tipo === 'cabelo') return <HairSvg width={width / 4.4} height={height / 4} />
        if (data.tipo === 'unha') return <NailSvg width={width / 4.4} height={height / 14} />
        if (data.tipo === 'cilios') return <Eyeslash width={width / 4.4} height={height / 4} />
    }
    function handleRemove(){
        
        remove(ref(db, 'agenda/' + data.id))
    }
    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Editar agendamento', { data })} onLongPress={() => handleRemove()}>
            <S.Container>
                {choseSvg()}
                <S.InfoContainer>
                    <S.Name>{data.cliente}</S.Name>
                    <S.Hour>{data.hora}</S.Hour>
                </S.InfoContainer>
                <S.ProcedureContainer>
                    <FlatList
                        style={{height: height / 18}}
                        data={proceedings}
                        keyExtractor={(item) => item}
                        renderItem={({item}) => <S.Procedure numberOfLines={1}>{item}</S.Procedure>}
                    />
                    {/* {
                        proceedings?.map(item => <S.Procedure key={item}>{item}</S.Procedure>)
                    } */}
                </S.ProcedureContainer>
            </S.Container>

        </TouchableWithoutFeedback>
    );
}