import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';

import Animated, { 
  Extrapolate, 
  interpolate, 
  runOnJS, 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming
} from 'react-native-reanimated';

import {
  Container
} from './styles';

export function Splash(){
  const splashAnimation = useSharedValue(0);

  const { reset, navigate } = useNavigation();

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 30, 40 ,50],[1,0.8,0.9,0]),
      transform: [
        {
          translateX: interpolate(splashAnimation.value,
            [0, 20, 30, 40, 50],
            [0, 50, 65, 75, 75],
            Extrapolate.CLAMP 
          ),
        }, 
        {
          scale: interpolate(splashAnimation.value,
            [0, 50],
            [1, .3],
            Extrapolate.CLAMP 
          ),
        }
      ],
    }
  });

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 25, 35, 40, 50],[0, 0, .3, .8, 1]),
    }
  });

  function startApp() {
    navigate('SignIn');
  }

  useEffect(() => {
    splashAnimation.value = withTiming( 
      50,
      { duration: 1500 },
      () => {
        'worklet'
        runOnJS(startApp)();
      }  
    );
  }, []);

  return (
    <Container>
      <Animated.View style={[brandStyle]}>
        <BrandSvg width={80} height={50} />
      </Animated.View>

      <Animated.View style={[logoStyle, {position: 'absolute'}]}>
        <LogoSvg width={180} height={20} />
      </Animated.View>
    </Container>
  );
}