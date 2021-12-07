import React from 'react';
import { AuthProvider } from './AuthProvider';
import Routes from './Routes';
import { NavigationContainer } from '@react-navigation/native';

export default function Providers() {
  return (
    <AuthProvider>
    <NavigationContainer>
    <Routes/>
    </NavigationContainer>
      
    </AuthProvider>
  )
}