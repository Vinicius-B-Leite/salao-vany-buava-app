import styled from 'styled-components/native';


export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #0C031E;
    padding: 5%;
`;
export const Header = styled.View`
    background-color: #0C031E;
    paddingVertical: 5%;
    paddingHorizontal: 4%;
    flex-direction: row;
    align-items: center;
    border-bottom-width: 1px;
    border-bottom-color: #410C6B;
`

export const Title = styled.Text`
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    padding-left: 9%;
`
export const Welcome = styled.Text`
    color: #fff;
    font-size: 30px;
    line-height: 100px;
`
export const DataContainer = styled.View`
    flex-direction: row;
    width: 100%;
    align-items: center;
`

export const Date = styled.Text`
    color: #fff;
    padding-left: 5%;
`