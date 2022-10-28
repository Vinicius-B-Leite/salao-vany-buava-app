import { child, get, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { Dimensions, Text, View, TouchableWithoutFeedback } from 'react-native';
import HairSvg from '../../assets/hair.svg';
import NailSvg from '../../assets/nailpolish.svg'
import Eyeslash from '../../assets/yeyslash.svg'
import { db } from '../../service/firebase';

import * as S from './styles'


const { width, height } = Dimensions.get('screen')

export default function HomeItem({ data }) {

    const [proceedings, setProceedings] = useState([])

    useEffect(() => {
        async function getProceedingsName(item) {
            get(child(ref(db), `procedimentos/${data.tipo}/${item}`)).then(snapshot => {
                if (snapshot.exists()){
                    setProceedings(oldP => [...oldP, snapshot.val().nome])
                }
            }).catch(e => alert(e))
        }
        data.procedimento.forEach((item) => {
            getProceedingsName(item)
        })
    }, [])

    function choseSvg() {
        if (data.tipo === 'cabelo') return <HairSvg width={width / 4.4} height={height / 10} />
        if (data.tipo === 'unha') return <NailSvg width={width / 4.4} height={height / 15} />
        if (data.tipo === 'cilios') return <Eyeslash width={width / 4.4} height={height / 10} />
    }
    return (
        <TouchableWithoutFeedback>
            <S.Container>
                {choseSvg()}
                <S.InfoContainer>
                    <S.Name>{data.cliente}</S.Name>
                    <S.Hour>{data.hora}</S.Hour>
                </S.InfoContainer>
                <S.ProcedureContainer>
                    {
                        proceedings?.map(item => <S.Procedure key={item}>{item}</S.Procedure>)
                    }
                </S.ProcedureContainer>
            </S.Container>

        </TouchableWithoutFeedback>
    );
}