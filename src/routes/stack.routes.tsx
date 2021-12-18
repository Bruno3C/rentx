import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { ShedulingDetails } from '../screens/ShedulingDetails';
import { ShedulingComplete } from '../screens/ShedulingComplete';

const { Navigator, Screen } = createStackNavigator();

export function StackRoutes() {
  return (
    <Navigator headerMode='none'>
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
        name="ShedulingComplete"
        component={ShedulingComplete}
      />      
    </Navigator>
  )
}