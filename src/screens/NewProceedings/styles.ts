import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #0C031E;
    padding: 5%;
`;
export const Input = styled.TextInput.attrs({
    placeholderTextColor: '#808080'
})`
    border: 1px solid #fff;
    padding: 4% 5%;
    margin-top: 20%;
    margin-bottom: 5%;
    color: #fff;
`;
export const Button = styled.TouchableOpacity`
    margin-top: 10%;
    background-color: #A036F3;
    justify-content: center;
    align-items: center;
    paddingVertical: 4%;

`;
export const TextButton = styled.Text`
    color: #fff;
    font-size: 18px;
`;