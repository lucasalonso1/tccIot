import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCmlAYkMlYn1yxiZgO8eaiwA-FG1KlYLPs",
    authDomain: "trabalhopp-7e58e.firebaseapp.com",
    databaseURL: "https://trabalhopp-7e58e-default-rtdb.firebaseio.com/",
    projectId: "trabalhopp-7e58e",
    storageBucket: "trabalhopp-7e58e.appspot.com",
    messagingSenderId: "252088541616",
    appId: "1:252088541616:web:3ee1ed3616925aef1bf675",
    measurementId: "G-S00FPW9BS1"
  };

  const myApp = initializeApp(firebaseConfig);

  export default myApp;
  export const app = m