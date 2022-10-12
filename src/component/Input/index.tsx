import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";
import { TextInputProps } from "react-native";

import { useField } from "@unform/core";

import {
  Container,
  InputComponent,
  LabelInput,
  PasswordImage,
  InputContainer,
  LabelError,
  LabelContainer,
  UnderMessageInput,
  PasswordView,
} from "./styles";

export type IInputProps = TextInputProps & {
  name: string;
  labelInput: string;
  labelError?: string;
  inputTypePassword?: boolean;
  underMessageInput?: string;
  isEditableForm?: boolean;
  isPasswordInput?: boolean;
  isError?: boolean;
  labelErrorAPI?: string;
};
interface IInputValueReference {
  value: string;
}
interface IInputRef {
  focus(): void;
  blur(): void;
}
const Input: React.ForwardRefRenderFunction<IInputRef, IInputProps> = (
  {
    name,
    labelInput,
    underMessageInput = "",
    isPasswordInput = false,
    ...rest
  },
  ref
) => {
  const inputElementRef = useRef<any>(null);
  const { registerField, defaultValue, fieldName, error } = useField(name);

  const inputValueRef = useRef<IInputValueReference>({ value: defaultValue });

  const [isFocus, setIsFocus] = useState(false);
  const [isField, setIsField] = useState(false);
  const [isPassowrdVisible, setIsPasswordVisible] = useState(false);

  const handleWithView = useCallback(() => {
    setIsPasswordVisible(!isPassowrdVisible);
  }, [isPassowrdVisible]);

  const handleWithFocus = useCallback(() => {
    if (isPasswordInput && (!!underMessageInput || !!error)) {
      inputElementRef.current?.setNativeProps({ text: "" });
    }
    setIsFocus(true);
  }, []);

  const handleWithBlur = useCallback(() => {
    setIsFocus(!setIsFocus);
    setIsField(!!inputValueRef.current.value);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
    blur() {
      inputElementRef.current.blur();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: "value",
      setValue(ref: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = "";
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <LabelContainer>
        <LabelInput>{labelInput}</LabelInput>
        {!!error ? <LabelError>{error}</LabelError> : null}
      </LabelContainer>

      <InputContainer
        isField={isField}
        isFocus={isFocus}
        isError={!!error || !!underMessageInput ? true : false}
      >
        <InputComponent
          ref={inputElementRef}
          onBlur={handleWithBlur}
          onFocus={handleWithFocus}
          secureTextEntry={!isPassowrdVisible && isPasswordInput ? true : false}
          autoCorrect={false}
          defaultValue={defaultValue}
          onChangeText={(value) => (inputValueRef.current.value = value)}
          {...rest}
        />
        
      </InputContainer>
      {!!underMessageInput && (
        <UnderMessageInput
          isError={!!underMessageInput}
          underMessageInput={true}
          isFocus={isFocus}
        >
          {underMessageInput}
        </UnderMessageInput>
      )}
    </Container>
  );
};
export default forwardRef(Input);
