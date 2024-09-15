import styled from 'styled-components/native'

export const Container = styled.View`
  display: flex;
  flex: 1;
  padding: 40px;
  justify-content: center;
  align-items: stretch;
  background-color: rgba(0, 150, 136, 0.7);
`;

export const WhiteBox = styled.View`
  background-color: rgba(255, 255, 255, 0.8);
  padding: 30px;
  border-radius: 10px; 
  width: 100%; 
  align-items: center; 
`;

export const Title = styled.Text`
  text-align: center;
  color: #ffffff;
  font-size: 24px;
  font-weight: bold;
`;

export const TextInformation = styled.Text`
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
  color: #dddddd;
  line-height: 21px;
`;

export const Error = styled.Text`
  color: #e37a7a;
  text-align: center;
  margin-top: 10px;
`;

export const Form = styled.View`
  margin-top: 20px;
  align-items: center;
`;

export const Input = styled.TextInput`
  background-color: #FFFFFF;
  border-radius: 20px;
  border: 1px solid #009688;
  height: 44px;
  width: 320px;
  padding: 0px 20px;
  margin-bottom: 10px;
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
