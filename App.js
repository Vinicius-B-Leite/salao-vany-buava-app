import 'react-native-gesture-handler';
import React from 'react';
import AuthContextProvider from './src/contexts/auth';
import Routes from './src/routes';
import Login from './src/screens/Login';
import { StatusBar } from 'react-native';



export default function App() {
  return (
    <AuthContextProvider>
      <StatusBar/>
      <Routes />
    </AuthContextProvider>
  );
}
