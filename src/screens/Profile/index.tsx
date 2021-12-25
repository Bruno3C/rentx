import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import { BackButton } from '../../components/BackButton';

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton
} from './styles';

export function Profile(){
  const theme = useTheme();
  const { goBack } = useNavigation();

  function handleBack() {
    goBack();
  }

  return (
    <Container>
      <Header>
        <HeaderTop>
          <BackButton 
            color={theme.colors.shape}
            onPress={handleBack}
          />
          <HeaderTitle>Editar Perfil</HeaderTitle>
          <LogoutButton>
            <Feather name="power" size={24} color={theme.colors.shape} />
          </LogoutButton>
        </HeaderTop>
        
        <PhotoContainer>
          <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/87588900?v=4' }} resizeMode="contain" />
          <PhotoButton>
            <Feather name="camera" size={24} color={theme.colors.shape} />
          </PhotoButton>
        </PhotoContainer>
      </Header>
    </Container>
  );
}