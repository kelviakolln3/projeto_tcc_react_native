import styled from 'styled-components/native'

export const Form = styled.View`
  margin-top: 20px;
  align-items: center;
`;

export const Input = styled.TextInput`
  background-color: #FFFFFF;
  border-radius: 20px;
  border: 1px solid #009688;
  height: 44px;
  width: 400px;
  padding: 0px 20px;
  margin-bottom: 10px;
`;

export const Error = styled.Text`
  color: #e37a7a;
  text-align: center;
  margin-top: 10px;
`;

export const Button = styled.TouchableOpacity`
  background-color: #009688;
  border-radius: 20px;
  height: 44px;
  width: 100px;
  padding: 0px 20px;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #ffffff;
  font-weight: bold;
  font-size: 14px;
`;

export const inputStyle = {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#009688',
    height: 44,
    width: 400,
    paddingLeft: 20,
    marginBottom: 10,
};