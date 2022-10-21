import React from 'react';
import { Dimensions, Text, View, TouchableWithoutFeedback } from 'react-native';
import HairSvg from '../../assets/hair.svg';
import NailSvg from '../../assets/nailpolish.svg'
import Eyeslash from '../../assets/yeyslash.svg'

import * as S from './styles'


const { width, height } = Dimensions.get('screen')

export default function HomeItem({ data }) {
    function choseSvg() {
        if (data.type === 'hair') return <HairSvg width={width / 4.4} height={height / 10} />
        if (data.type === 'nail') return <NailSvg width={width / 4.4} height={height / 15} />
        if (data.type === 'eyeslash') return <Eyeslash width={width / 4.4} height={height / 10} />
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
                        data.procedimento.map(item => <S.Procedure>{item}</S.Procedure>)
                    }
                </S.ProcedureContainer> 
            </S.Container>

        </TouchableWithoutFeedback>
    );
}