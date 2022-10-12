import styled from "styled-components/native"
import { TouchableOpacity, TextInput } from "react-native";

type StylesProps = {
  isFocus: boolean;
  isField: boolean;
  isError: boolean;
};
type InfoProps = {
  isFocus: boolean;
  isError: boolean;
  underMessageInput?: boolean;
};

export const Container = styled.View`
  height: 59px;
  margin-top: 12px;
  /* background-color: red; */
`;

export const LabelInput = styled.Text`
  color: gray;
  font-size: 14px;
`;

export const LabelError = styled.Text`
  color: red;
  font-size: 14px;
  padding-left: 5px;
`;
export const LabelContainer = styled.View`
  flex-direction: row;
`;

export const InputContainer = styled.View<StylesProps>`
  padding-top: 2px;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 2px;
  border-bottom-color: ${({ theme, isField, isFocus, isError }) =>
    (isFocus || isField) && !isError
      ? "blue"
      : isError && !isFocus
      ? "red"
      : "gray"};
`;

export const InputComponent = styled(TextInput)`
  /* background-color: black; */
  color: gray;
  font-size: 18px;
  font-weight: 500;
  padding-left: 1px;
  width: 90%;
`;

export const PasswordImage = styled.Image``;
export const PasswordView = styled(TouchableOpacity)``;

export const UnderMessageInput = styled.Text<InfoProps>`
  margin-top: 8px;
  font-weight: 500;
  font-size: 12px;
  color: ${({ theme, underMessageInput, isError, isFocus }) =>
    underMessageInput && isError && !isFocus
      ? "red"
      : "gray"};
`;

export const InputStatusColorBar = styled.View`
  height: 1px;
  border: 0.5px;
  border-color: blue;
  margin-top: 4px;
`;
