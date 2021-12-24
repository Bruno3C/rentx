import React from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import {
  Container,
  Content,
  Title,
  Message,
  Footer
} from './styles';
import { ConfirmButton } from '../../components/ConfirmButton';

interface Params {
  title: string;
  message: string;
  nextScreenRoute: string;
}

export function Confirmation(){
  // hooks ( como useWindowDimensions) só funcionam dentro de components react, fora deles use a Dimensions do react-native 
  const { width } = useWindowDimensions();
  const { navigate } = useNavigation();

  const route = useRoute();
  const {
    title,
    message,
    nextScreenRoute
  } = route.params as Params;

  function handleConfirm() {
    navigate(nextScreenRoute);
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>{title}</Title>

        <Message>
          {message}
        </Message>
      </Content>
      <Footer>
        <ConfirmButton title='OK' onPress={handleConfirm}/>
      </Footer>
    </Container>
  );
}