import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: #0C031E;
    align-items: center;
    padding: 5%;
`;
export const InputContainer = styled.View`
    border-width: 1px;
    border-color: #fff;
    width: 90%;
    padding: 5%;
    margin-top: 8%;
    border-radius: 5px;
    position: relative;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;
export const TextInput = styled.Text`
    color: #fff;
    position: absolute;
    top: -30%;
    left: 5%;
    background-color: #0C031E;
    width: 20%;
    text-align: center;
`;
export const Input = styled.TextInput`
    color: #fff;
    height: 100%;
    width: 85%;
`;
export const LoginButton = styled.TouchableOpacity`
    background-color: #A036F3;
    margin-top: 8%;
    width: 90%;
    justify-content: center;
    align-items: center;
    padding: 4%;
    border-radius: 5px;
`;
export const TextLoginButton = styled.Text`
    font-size: 17px;
    color: #fff;
    font-weight: bold;
`;

export const Error = styled.Text`
    width: 90%;
    background-color: #fc1303;
    color: #FFF;
    font-size: 15px;
    padding-left: 5%;
    paddingVertical: 1%;
    border-radius: 5px;
`