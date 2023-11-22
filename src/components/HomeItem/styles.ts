import { Dimensions } from 'react-native';
import styled from 'styled-components/native';


const {width, height} = Dimensions.get('screen')
export const Container = styled.View`
    width: 100%;
    height: ${height / 9}px;
    background-color: #7A4D9D;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    paddingHorizontal: 5%;
    margin-top: 5%;
`;
export const InfoContainer = styled.View`
    width: 40%;
`;
export const Name = styled.Text`
    font-size: 15px;
    color: #fff;
`;
export const Hour = styled.Text`
    font-size: 13px;
    color: #fff;
`;

export const ProcedureContainer = styled.View`
    width: 30%;
`
export const Procedure = styled.Text`
    font-size: 13px;
    color: #fff;
`;