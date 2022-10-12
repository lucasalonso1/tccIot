import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import { ActivityIndicator, Keyboard, Text, TextInput, View,  } from 'react-native';
import { 
         ColorContainer,
         MaxCurrentContainer,
         MaxCurrent,
         MaxCurrentValueContainer,
         MaxCurrentValue,
         SystemStatusContainer,
         SystemStatus,
         DataContainer,
         DashboardContainer,
         DashBoardTop,
         DashBoardDown,
         InputContainer,
         ButtonContainer,
         ButtonSave,
         ButtonPower,
         InputLabel,
         ButtonTitle,
} from './styles';
import { Dashboard } from './src/component/Dashboard';
import { initializeApp } from 'firebase/app'; 
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { FormHandles } from "@unform/core";
import { Form } from "@unform/mobile";
import Input from "./src/component/Input";
// import { Container } from './styles';

interface AppProps{
  status?: "1" | "0" | "2"
}

interface objetoprops{
  R: number,
  S: number,
  T: number,
  V: number,
  L: string,
  MAXC: number
}



export default function App(
  {
  status = "1"
}:AppProps
)
{
  const formRef = useRef<FormHandles>(null);
  const inputRef =useRef<TextInput>(null);
  // const emailInputRef = useRef<TextInput>(null);
  const [state, setState] = useState<objetoprops>()
  const firebaseConfig = {
    apiKey: "AIzaSyCmlAYkMlYn1yxiZgO8eaiwA-FG1KlYLPs",
    authDomain: "trabalhopp-7e58e.firebaseapp.com",
    databaseURL: "https://trabalhopp-7e58e-default-rtdb.firebaseio.com",
    projectId: "trabalhopp-7e58e",
    storageBucket: "trabalhopp-7e58e.appspot.com",
    messagingSenderId: "252088541616",
    appId: "1:252088541616:web:3ee1ed3616925aef1bf675",
    measurementId: "G-S00FPW9BS1"
  };
  initializeApp(firebaseConfig);
  const db = getDatabase();
  // let R, S, T, V, L, MAXC:any
  const [statusValue, setStatusValue] = useState("0")
  const [correntemaxima, setCorrenteMaxima] = useState()
  const reference = ref(db, 'dados/');
  const reference2 = ref(db, 'dados/MAXC');


  useLayoutEffect(() => {
    onValue(reference, (snapshot) => { 
      setState({
        R:snapshot.val().R, 
        S:snapshot.val().S,
        T:snapshot.val().T,
        V:snapshot.val().V,
        L:snapshot.val().L,
        MAXC:snapshot.val().MAXC,
      })
  })
  },[]);
  
  // function getValues() {
  //   // console.log(reference)
  //   let render = 0
  //   onValue(reference, (snapshot) => {
  //     if (state.R != snapshot.val().R){
  //       setState({...state, R:snapshot.val().R});}
  //     if (state.S != snapshot.val().S){
  //       setState({ ...state, S:snapshot.val().S });}
  //     if (state.T != snapshot.val().T){
  //       setState({ ...state, T:snapshot.val().T });}
  //     if (state.V != snapshot.val().V){
  //         setState({ ...state, V:snapshot.val().V });}
  //     if (state.MAXC != snapshot.val().MAXC){
  //         setState({ ...state, MAXC:snapshot.val().MAXC });}
  //     if (state.L != snapshot.val().L){
  //       setState({ ...state, L:snapshot.val().L });
  //       setStatusValue(state.L)}
  //   });
  // }

  // getValues()

  function handleToggle(value:any){
    console.log("Chamou a função com",value)
    if (value === "1" || value === "2"){
      console.log("entrou no IF 1 ou 2 com", value)
      setState({...state, L: "0"})
      set(reference, {...state, L: "0" });
      console.log("Setou e deu foi para ",state)
    }else{
      setState({...state, L: "1"})
      set(reference, {...state, L: "1" });
    }
  }
  // function setCorrente(corrente: AppProps){
  //   console.log(corrente)
  //   if (corrente != state.MAXC){
  //     // setState(...state, MAXC: corrente)
  //     console.log(state)
  //    set(reference, {...state, MAXC: corrente });
  //   }
  // }

  const setCorrente = async(teste: any) => {
    console.log("set",teste)
    if (teste != state.MAXC && teste !=0){
      // setState(...state, MAXC: corrente)
      console.log(state)
     set(reference, {...state, MAXC: teste.Corrente });
    }
    formRef.current?.clearField("Corrente");
    Keyboard.dismiss();
    inputRef.current?.blur;
    // formRef.current?.blur("Corrente");
  }



  return (
    <>
    {/* <Text>teste</Text> */}
      <ColorContainer style={
            state?.L == '0'?
            {backgroundColor:"#73FF73"}:state?.L == '1'?{backgroundColor:"#FF7373"}: {backgroundColor:"#FFFF73"}}>
        <MaxCurrentContainer>
          <MaxCurrent>
            CORRENTE MÁXIMA
          </MaxCurrent>
        </MaxCurrentContainer>
        <MaxCurrentValueContainer>
          {state?.L?
          (<MaxCurrentValue>
            {`${state?.MAXC} A`}
          </MaxCurrentValue>) :
          (<ActivityIndicator size="large"/>)
          }
        </MaxCurrentValueContainer>
        <SystemStatusContainer>
          <SystemStatus>
          {state?.L == '1'?
            <SystemStatus>SISTEMA LIGADO</SystemStatus>
            :state?.L == '0'?
            <SystemStatus>SISTEMA DESLIGADO</SystemStatus> :
            <SystemStatus>SISTEMA DESARMADO</SystemStatus>}
          </SystemStatus>
        </SystemStatusContainer>
      </ColorContainer>
      
      <DataContainer>
        <DashboardContainer>
          <DashBoardTop>
            <Dashboard title='CORRENTE R' description={String(state?.R)}/>
            <Dashboard title='CORRENTE S' description={String(state?.S)}/>
          </DashBoardTop>
          <DashBoardDown>
            <Dashboard title='CORRENTE T' description={String(state?.T)}/>
            <Dashboard title='TENSÃO' description={String(state?.V)}/>
          </DashBoardDown>
        </DashboardContainer>
        <InputContainer>
          {/* <InputLabel>
           Valor de corrente máxima
          </InputLabel> */}
          <Form ref={formRef} onSubmit={setCorrente}>
            <Input ref={inputRef} name="Corrente" placeholder={"Corrente máxima"} labelInput="Valor de corrente máxima"/>
          </Form>
        </InputContainer>
        <ButtonContainer>
          <ButtonSave onPress={() => {
            formRef.current?.submitForm();
          }}>
            <ButtonTitle>SALVAR</ButtonTitle>
          </ButtonSave>
          {/* <View >

          </View>{console.log(statusValue)} */}
          <ButtonPower style={
            state?.L == '1'?
            {backgroundColor:"#FF7373"}:state?.L == '0'?{backgroundColor:"#73FF73"}:{backgroundColor:"#FFFF73"}}
            onPress={()=>{handleToggle(state?.L)}} >
            {state?.L == '1'?
            <ButtonTitle>DESLIGAR</ButtonTitle>
            :state?.L == '0'?
            <ButtonTitle>LIGAR</ButtonTitle> :
            <ButtonTitle>DESARMADO - RESET</ButtonTitle>}
          </ButtonPower>
        </ButtonContainer>
      </DataContainer>
    </>
  )
}

