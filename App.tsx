import React from 'react';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium
} from '@expo-google-fonts/inter';
import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold
} from '@expo-google-fonts/archivo';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components/native';

import theme from './src/styles/theme';


// import { Home } from './src/screens/Home';
// import { CarDetails } from './src/screens/CarDetails'; 
// import { Scheduling } from './src/screens/Scheduling';
import { ShedulingDetails } from './src/screens/ShedulingDetails';
import { ShedulingComplete } from './src/screens/ShedulingComplete';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold
  });

  if(!fontsLoaded) {
    return <AppLoading/>;
  }

  return (
    <ThemeProvider theme={theme}>
      <ShedulingComplete />
    </ThemeProvider>
  );
}