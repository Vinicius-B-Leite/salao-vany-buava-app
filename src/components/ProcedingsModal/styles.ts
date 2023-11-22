import styled from 'styled-components/native';


export const Container = styled.View`
    flex: 1;
    background-color: #0C031E;
    padding: 5%;
`
export const Header = styled.View`
    flex-direction: row;
    align-items:  center;
    justify-content: space-between;
`;

export const InputContainer = styled.View`
    background-color: #54407C;
    width: 85%;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: space-around;
    padding: 2%;
    border-radius: 30px;
`

export const Input = styled.TextInput.attrs({
    textAlign: 'right'
})`
    width: 80%;
    color: #fff;
`