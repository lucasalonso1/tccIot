import React, {useState} from "react";
import { Text, TextInput, View,  } from 'react-native';
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
         Input,


} from './styles';
import { Dashboard } from './src/component/Dashboard';
import { initializeApp } from 'firebase/app'; 
import { getDatabase, ref, onValue, set } from 'firebase/database';
// import { Container } from './styles';

interface AppProps{
  status?: "1" | "0" | "2"
}



export default function App(
  {
  status = "1"
}:AppProps
)
{

  const [state, setState] = useState({
    R: 0,
    S: 0,
    T: 0,
    V: 0,
    L: "0",
    MAXC: 0
  })
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
  const [statusValue, setStatusValue] = useState(state.L)
  const [correntemaxima, setCorrenteMaxima] = useState(state.MAXC)
  const reference = ref(db, 'dados/');
  
  function getValues() {
    // console.log(reference)
    let render = 0
    onValue(reference, (snapshot) => {
      if (state.R != snapshot.val().R){
        setState({...state, R:snapshot.val().R});}
      if (state.S != snapshot.val().S){
        setState({ ...state, S:snapshot.val().S });}
      if (state.T != snapshot.val().T){
        setState({ ...state, T:snapshot.val().T });}
      if (state.V != snapshot.val().V){
          setState({ ...state, V:snapshot.val().V });}
      if (state.MAXC != snapshot.val().MAXC){
          setState({ ...state, MAXC:snapshot.val().MAXC });}
      if (state.L != snapshot.val().L){
        setState({ ...state, L:snapshot.val().L });
        setStatusValue(state.L)}
    });
  }

  getValues()

  function handleToggle(value:AppProps){
    console.log(value)
    if (value == "1"){
      setStatusValue("0")
      set(reference, {...state, L: value });
    }else{
      setStatusValue("1")
      set(reference, {...state, L: value });
    }
  }
  function setCorrente(corrente: AppProps){
    console.log(corrente)
    if (corrente != state.MAXC){
    set(reference, {...state, MAXC: corrente });
    }
  }

  return (
    <>
    {/* <Text>teste</Text> */}
      <ColorContainer style={
            statusValue == '1'?
            {backgroundColor:"#73FF73"}:{backgroundColor:"#FF7373"}}>
        <MaxCurrentContainer>
          <MaxCurrent>
            CORRENTE MÁXIMA
          </MaxCurrent>
        </MaxCurrentContainer>
        <MaxCurrentValueContainer>
          <MaxCurrentValue>
            {`${state.MAXC} A`}
          </MaxCurrentValue>
        </MaxCurrentValueContainer>
        <SystemStatusContainer>
          <SystemStatus>
          {statusValue == '1'?
            <SystemStatus>SISTEMA LIGADO</SystemStatus>
            :statusValue == '0'?
            <SystemStatus>SISTEMA DESLIGADO</SystemStatus> :
            <SystemStatus>SISTEMA DESARMADO</SystemStatus>}
          </SystemStatus>
        </SystemStatusContainer>
      </ColorContainer>
      
      <DataContainer>
        <DashboardContainer>
          <DashBoardTop>
            <Dashboard title='CORRENTE R' description={String(state.R)}/>
            <Dashboard title='CORRENTE S' description={String(state.S)}/>
          </DashBoardTop>
          <DashBoardDown>
            <Dashboard title='CORRENTE T' description={String(state.T)}/>
            <Dashboard title='TENSÃO' description={String(state.V)}/>
          </DashBoardDown>
        </DashboardContainer>
        <InputContainer>
          <InputLabel>
           Valor de corrente máxima
          </InputLabel>
          <Input placeholder={"Corrente máxima"} value={correntemaxima} onChangeText={setCorrenteMaxima}/>
          {console.log(correntemaxima)}
        </InputContainer>
        <ButtonContainer>
          <ButtonSave onPress={setCorrente(correntemaxima)}>
            <ButtonTitle>SALVAR</ButtonTitle>
          </ButtonSave>
          {/* <View >

          </View>{console.log(statusValue)} */}
          <ButtonPower style={
            statusValue == '1'?
            {backgroundColor:"#FF7373"}:{backgroundColor:"#73FF73"}}
            onPress={()=>{handleToggle(statusValue)}} >
            {statusValue == '1'?
            <ButtonTitle>DESLIGAR</ButtonTitle>
            :statusValue == '0'?
            <ButtonTitle>LIGAR</ButtonTitle> :
            <ButtonTitle>DESARMADO</ButtonTitle>}
          </ButtonPower>
        </ButtonContainer>
      </DataContainer>
    </>
  )
}

