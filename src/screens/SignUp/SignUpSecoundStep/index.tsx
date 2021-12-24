import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { BackButton } from '../../../components/BackButton';
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';

import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { PasswordInput } from '../../../components/PasswordInput';
import { useTheme } from 'styled-components';

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle
} from './styles';

export function SignUpSecoundStep(){
  const navigation = useNavigation();
  const theme = useTheme();

  function handleBack() {
    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet active={true} />
              <Bullet active={false} />
            </Steps>
          </Header>

          <Title>
            Crie sua{`\n`}conta
          </Title>
          <SubTitle>
            Faça seu cadastro de{`\n`}
            forma rápida e fácil
          </SubTitle>
          <Form>
            <FormTitle>2. Senha</FormTitle>
            <PasswordInput
              iconName="lock"
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              placeholder="Senha"
            />
            <PasswordInput
              iconName="lock"
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              placeholder="Repetir senha"
            />
          </Form>
          <Button
            title="Cadastrar"
            color={theme.colors.success}
            onPress={() => {}}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}