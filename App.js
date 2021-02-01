import React from 'react';
import Routes from './src/Routes';
import firebase from 'firebase';
import { pushNotifications } from './src/services';

pushNotifications.configure();

const firebaseConfig = {
  apiKey: 'AIzaSyCBcles3gmPkSje4l5CoErNaSL4dUXYtO8',
  authDomain: 'card-picker-5fe6d.firebaseapp.com',
  projectId: 'card-picker-5fe6d',
  storageBucket: 'card-picker-5fe6d.appspot.com',
  messagingSenderId: '206451807131',
  appId: '1:206451807131:web:a823fcb78fe2a93dc5073e',
  measurementId: 'G-28NQHD56SZ',
};

firebase.initializeApp(firebaseConfig);

export default function App() {
  return (
      <Routes style={{backgroundColor: "#fff"}} />
  );
}