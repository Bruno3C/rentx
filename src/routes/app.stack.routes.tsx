import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { ShedulingDetails } from '../screens/ShedulingDetails';
import { MyCars } from '../screens/MyCars';
import { Confirmation } from '../screens/Confirmation';

const { Navigator, Screen } = createStackNavigator();

export function AppStackRoutes() {
  return (
    <Navigator 
      headerMode='none'
      initialRouteName='Home'
    >
      <Screen
        name="Home"
        component={Home}
      />
      <Screen
        name="CarDetails"
        component={CarDetails}
      />
      <Screen
        name="Scheduling"
        component={Scheduling}
      />
      <Screen
        name="ShedulingDetails"
        component={ShedulingDetails}
      />
      <Screen
        name="Confirmation"
        component={Confirmation}
      />  
      <Screen
        name="MyCars"
        component={MyCars}
      />    
    </Navigator>
  )
}