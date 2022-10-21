import React from 'react';
import AuthContextProvider from './src/contexts/auth';
import Login from './src/screens/Login';



export default function App() {
  return (
    <AuthContextProvider>
      <Login />
    </AuthContextProvider>
  );
}
