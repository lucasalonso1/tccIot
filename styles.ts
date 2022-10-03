import { TextInput, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

export const ColorContainer = styled.View`
  flex: 3;
  width: 100%;
  background-color: #73FF73;
  align-items: center;
  justify-content: space-between;
`;

export const MaxCurrentContainer = styled.View`
  align-items: center;
  margin-top: 30px;
`;

export const MaxCurrent = styled.Text`
  color: #000000;
  font-size: 24px;
  font-weight: bold;
`;

export const MaxCurrentValueContainer = styled.View`
  align-items: center;

`;
export const MaxCurrentValue = styled.Text`
  color: #000000;
  font-size: 48px;
  font-weight: bold;
`;

export const SystemStatusContainer = styled.View`
  align-items: center;

`;
export const SystemStatus = styled.Text`
  color: #000000;
  font-size: 24px;
  font-weight: bold;
`;

export const DataContainer = styled.View`
  flex: 5;
  width: 100%;
`;

export const DashboardContainer = styled.View`
  min-height: 140px;
  /* background-color: blue; */
`;

export const DashBoardTop = styled.View`
  /* margin-left: 16px;
  margin-right: 16px; */
  margin-top: 16px;
  flex-direction: row;
  justify-content: space-around;
`;

export const DashBoardDown = styled.View`
  flex-direction: row;
  margin-bottom: 16px;
  margin-top: 24px;
  flex-direction: row;
  justify-content: space-around;
`;

export const InputContainer = styled.View`
  margin-left: 16px;
  margin-right: 16px;
`;
export const InputLabel = styled.Text`
  color: #000000;
  font-size: 16px;
  font-weight: bold;
`;

export const ButtonContainer = styled.View`
  width: 100%;
`;

export const ButtonSave = styled(TouchableOpacity)`
  background-color: #F2F3F5;
  margin-left: 14px;
  margin-right: 14px;
  height: 38px;
  align-items: center;
  justify-content: center;
  /* border-width: 1px;
  border-radius: 4px; */
`;


export const ButtonPower = styled(TouchableOpacity)`
  /* background-color: #FF7373; */
  margin-top: 14px;
  margin-left: 14px;
  margin-right: 14px;
  height: 38px;
  align-items: center;
  justify-content: center;
  align-items: center;
  justify-content: center;
  /* border-width: 1px;
  border-radius: 4px; */
`;

export const ButtonTitle = styled.Text`
  color: #000000;
  font-size: 16px;
  font-weight: bold;
`;

export const Input = styled(TextInput)`
  height: 45px;
  border-radius: 5px;
  color: #000000;
  font-size: 32px;
  background-color: #F2F3F5;
  margin-top: 4px;
  margin-bottom: 14px;
  padding-left: 14px;
  padding-right: 14px; 
  text-decoration: none;
  text-decoration-line: none;
  border-width: 1px;
`;



