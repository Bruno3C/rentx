import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { BorderlessButton } from 'react-native-gesture-handler';

import {
  Container,
  IconContainer,
  InputText
} from './styles';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
}

export function PasswordInput({
  iconName,
  ...rest
}: Props){
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const theme = useTheme();


  return (
    <Container>
      <IconContainer>
        <Feather
          name={iconName}
          size={24}
          color={theme.colors.text_detail}
        />
      </IconContainer>
      <InputText 
        secureTextEntry={!isPasswordVisible}
        {...rest}
      />

      <BorderlessButton
        onPress={() => {setIsPasswordVisible(!isPasswordVisible)}}
      >
        <IconContainer>
          <Feather
            name={isPasswordVisible ? "eye-off" : "eye"}
            size={24}
            color={theme.colors.text_detail}
          />
        </IconContainer>
      </BorderlessButton>
    </Container>
  );
}