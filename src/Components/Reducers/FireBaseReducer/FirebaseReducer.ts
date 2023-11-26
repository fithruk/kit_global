import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCNs_EYPUwRO90e4GHOOX-JYDWTDPJ4-9U",
  authDomain: "kit-test-e6462.firebaseapp.com",
  projectId: "kit-test-e6462",
  storageBucket: "kit-test-e6462.appspot.com",
  messagingSenderId: "624713852915",
  appId: "1:624713852915:web:dad00b8051a26b35a75486",
  measurementId: "G-J06KDYSJRG",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

const inintalState = { firestore, auth };

const firebaseReducer = (state = inintalState, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};

export { firebaseReducer };
