import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: #0C031E;
    padding: 5%;
    justify-content: center;
    `;

export const Main = styled.View`
    height: 65%;
    width: 100%;
    justify-content: space-between;
`

export const Input = styled.TextInput.attrs({
    placeholderTextColor: '#808080'
})`
    color: #fff;
    border-width: 1px;
    border-color: #fff;
    border-radius: 5px;
    paddingVertical: 4%;
    padding-left: 6%;
    width: ${props => props.width || '100%'};
`
export const Row = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: ${props => props.width || '100%'};
`



export const ScheduleTitle = styled.Text`
    color: #fff;
    line-height: 50px;
`

export const Underline = styled.View`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 5%;
    background-color: #fff;
`
export const Button = styled.TouchableOpacity`
    background-color: #A036F3;
    justify-content: center;
    align-items: center;
    padding: 3.5%;
`

export const ButtonText = styled.Text`
    color: #fff;
    font-size: 18px;
`
export const Error = styled.Text`
    width: 100%;
    background-color: #fc1303;
    color: #FFF;
    font-size: 15px;
    padding-left: 5%;
    paddingVertical: 2%;
    border-radius: 5px;
`
