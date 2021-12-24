import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { ShedulingDetails } from '../screens/ShedulingDetails';
import { MyCars } from '../screens/MyCars';
import { Splash } from '../screens/Splash';
import { SignIn } from '../screens/SignIn';
import { SignUpFirstStep } from '../screens/SignUp/SignUpFirstStep';
import { SignUpSecoundStep } from '../screens/SignUp/SignUpSecoundStep';
import { Confirmation } from '../screens/Confirmation';

const { Navigator, Screen } = createStackNavigator();

export function StackRoutes() {
  return (
    <Navigator 
      headerMode='none'
      initialRouteName='SignIn'
    >
      <Screen
        name="Home"
        component={Home}
        options={{
          gestureEnabled: false
        }}
      />
      <Screen
        name="SignIn"
        component={SignIn}
      />
      <Screen
        name="SignUpFirstStep"
        component={SignUpFirstStep}
      />
      <Screen
        name="SignUpSecoundStep"
        component={SignUpSecoundStep}
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