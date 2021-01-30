import React from 'react';
import Routes from './src/Routes';
import { pushNotifications } from './src/services';

pushNotifications.configure();

export default function App() {
  return (
      <Routes style={{backgroundColor: "#fff"}} />
  );
}