import styled from 'styled-components/native'

export const Container = styled.View`
    display: flex;
    flex: 1;
    padding: 40px;
    justify-content: center;
    align-items: stretch;
    background-color: #FFFFFF;
`;

export const Card = styled.View`
    height: 70,
    borderColor: 'rgba(0, 128, 128, 0.4)',
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
`;

export const Text = styled.Text`
    fontSize: 22,
    color: 'black',
    marginLeft: 10,
    flex: 1,
`;
