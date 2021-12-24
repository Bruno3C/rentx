import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { Splash } from '../screens/Splash';
import { SignIn } from '../screens/SignIn';
import { SignUpFirstStep } from '../screens/SignUp/SignUpFirstStep';
import { SignUpSecoundStep } from '../screens/SignUp/SignUpSecoundStep';
import { Confirmation } from '../screens/Confirmation';

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator 
      headerMode='none'
      initialRouteName='Splash'
    >
      <Screen
        name="Splash"
        component={Splash}
      />   
      <Screen
        name="SignIn"
        component={SignIn}
        options={{
          gestureEnabled: false
        }}
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
        name="Confirmation"
        component={Confirmation}
      />
    </Navigator>
  )
}