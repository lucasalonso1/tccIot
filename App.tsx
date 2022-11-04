import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from "react";
import { ActivityIndicator, Keyboard, Text, TextInput, TouchableWithoutFeedback, View,  } from 'react-native';
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
import { getDatabase, ref, onValue, set, get, child, push } from 'firebase/database';
import { FormHandles } from "@unform/core";
import { Form } from "@unform/mobile";
import Input from "./src/component/Input";
// import { Container } from './styles';

interface AppProps{
  status?: "1" | "0" | "2"
}

interface objetoprops{
  CorrenteR: number,
  CorrenteS: number,
  CorrenteT: number,
  Tensao: number,
  LigaDesliga: number,
  CorrenteDesarme: number,
  Status: number
}

export default function App(
  {
  status = "1"
}:AppProps
)
{
  const formRef = useRef<FormHandles>(null);
  const inputRef =useRef<TextInput>(null);
  const [state, setState] = useState<objetoprops>()
  const firebaseConfig = {
    apiKey: "AIzaSyCm97z1-MwQmtz-qjUVOHSjsHe5fmzwSW4",
    authDomain: "projetotcc-52bd3.firebaseapp.com",
    databaseURL: "https://projetotcc-52bd3-default-rtdb.firebaseio.com/",
    projectId: "projetotcc-52bd3",
    storageBucket: "projetotcc-52bd3.appspot.com",
    messagingSenderId: "601496828216",
    appId: "1:601496828216:web:3fca36415d5cad1937e9cd"
  };
  initializeApp(firebaseConfig);
  const db = getDatabase();
  // let R, S, T, V, L, MAXC:any
  const [statusValue, setStatusValue] = useState("0")
  const [correntemaxima, setCorrenteMaxima] = useState()
  const reference = ref(db, 'Placa/');
  const reference2 = ref(db, 'dados/CorrenteDesarme');



  useLayoutEffect(() => {
    onValue(reference, (snapshot) => { 
      setState({
        CorrenteR:snapshot.val().CorrenteR, 
        CorrenteS:snapshot.val().CorrenteS,
        CorrenteT:snapshot.val().CorrenteT,
        Tensao:snapshot.val().Tensao,
        LigaDesliga:snapshot.val().LigaDesliga,
        CorrenteDesarme:snapshot.val().CorrenteDesarme,
        Status:snapshot.val().Status,
      })
    })
    console.log("renderizou", state)
  },[]);
  
  function handleToggle(value:any){
    console.log("Chamou a função com",value)
    // if (state.Status === 2){
    //   console.log("status",state.Status )
    //   setState({...state, LigaDesliga: 0})
    //   set(reference, {...state, L: "0" });
    //   return
    // }
    if (value == 1 || value == 2){
      console.log("entrou no IF 1 ou 2 com", value)
      setState({...state, LigaDesliga: 0})
      set(reference, {...state, LigaDesliga: 0 });
      console.log("Setou e deu foi para ",state)
      return
    }else{
      setState({...state, LigaDesliga: 1})
      set(reference, {...state, LigaDesliga: 1 });
      return
    }
  }

  const setCorrente = async(teste: any) => {
    console.log("set",teste)
    if (teste != state.CorrenteDesarme && teste !=0){
      // setState(...state, CorrenteDesarme: corrente)
      console.log(state)
     set(reference, {...state, CorrenteDesarme: Number(teste.Corrente) });
    }
    formRef.current?.clearField("Corrente");
    Keyboard.dismiss();
    inputRef.current?.blur;
    // formRef.current?.blur("Corrente");
  }



  return (
    <>
        <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss();}}>
      <ColorContainer style={
            state?.Status == 0 && state?.LigaDesliga == state?.Status? {backgroundColor:"#73FF73"}
            :state?.Status == 1  && state?.LigaDesliga == state?.Status ?{backgroundColor:"#FF7373"}
            :state?.LigaDesliga ==2  || (state?.LigaDesliga ==1 && state?.Status == 2) ?{backgroundColor:"#FFFF73"}
            :{backgroundColor:"#73bbff"}
          }>
        <MaxCurrentContainer>
          <MaxCurrent>
            CORRENTE MÁXIMA
          </MaxCurrent>
        </MaxCurrentContainer>
        <MaxCurrentValueContainer>
          {/* {console.log(state.LigaDesliga != null? "true": "false")} */}
          {state?.LigaDesliga !=null ?
          (<MaxCurrentValue>
            {`${state?.CorrenteDesarme} A`}
          </MaxCurrentValue>) :
          (<ActivityIndicator size="large"/>)
          }
        </MaxCurrentValueContainer>
        <SystemStatusContainer>
          
          {state?.LigaDesliga == 1 && state?.LigaDesliga == state?.Status?
            <SystemStatus>SISTEMA LIGADO</SystemStatus>
            :state?.LigaDesliga == 0  && state?.LigaDesliga == state?.Status?
            <SystemStatus>SISTEMA DESLIGADO</SystemStatus> 
            :state?.LigaDesliga ==2  || (state?.LigaDesliga ==1 && state?.Status == 2)?
            <SystemStatus>SISTEMA DESARMADO</SystemStatus>
            :
            <View>
            <ActivityIndicator size="large"/>
            <SystemStatus>SISTEMA LIGANDO / DESLIGANDO</SystemStatus>
            </View>
          }
          
        </SystemStatusContainer>
      </ColorContainer>  
        </TouchableWithoutFeedback>
      <DataContainer>
        <DashboardContainer>
          <DashBoardTop>
            <Dashboard title='CORRENTE R' description={String(state?.CorrenteR)}/>
            <Dashboard title='CORRENTE S' description={String(state?.CorrenteS)}/>
          </DashBoardTop>
          <DashBoardDown>
            <Dashboard title='CORRENTE T' description={String(state?.CorrenteT)}/>
            <Dashboard title='TENSÃO' description={String(state?.Tensao)}/>
          </DashBoardDown>
        </DashboardContainer>
        <InputContainer>
          <Form ref={formRef} onSubmit={setCorrente}>
            <Input ref={inputRef} name="Corrente" placeholder={"Corrente máxima"} labelInput="Valor de corrente máxima" keyboardType="numeric"/>
          </Form>
        </InputContainer>
        <ButtonContainer>
          <ButtonSave onPress={() => {
            formRef.current?.submitForm();
          }}>
            <ButtonTitle>SALVAR</ButtonTitle>
          </ButtonSave>
          <ButtonPower style={
            state?.Status == 1? {backgroundColor:"#FF7373"}
            :state?.Status == 0?{backgroundColor:"#73FF73"}
            :{backgroundColor:"#FFFF73"}}
          onPress={()=>{handleToggle(state?.LigaDesliga)}} disabled={state?.LigaDesliga != state?.Status  && state?.Status != 2 ? true:false}>
            {state?.LigaDesliga != state?.Status && state?.Status != 2 ? <ActivityIndicator size="large"/>
            :state?.Status == 1? <ButtonTitle>DESLIGAR</ButtonTitle>
            :state?.Status == 0? <ButtonTitle>LIGAR</ButtonTitle> 
            :<ButtonTitle>DESARMADO - RESET</ButtonTitle>}
          </ButtonPower>
        </ButtonContainer>
      </DataContainer>
    </>
  )
}

