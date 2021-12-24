import React, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { PasswordInput } from '../../../components/PasswordInput';

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle
} from './styles';
import { api } from '../../../services/api';

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  }
}

export function SignUpSecoundStep(){
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const navigation = useNavigation();
  const theme = useTheme();
  const route = useRoute();
  const { user } = route.params as Params;

  function handleBack() {
    navigation.goBack();
  }

  async function handleRegister() {
    if(!password || !passwordConfirm) {
      return Alert.alert('Informe a senha e a confirmação.');
    }

    if(password != passwordConfirm) {
      return Alert.alert('As senhas não são iguais.');
    }

    await api.post('/users', {
      ...user,
      driver_license: user.driverLicense,
      password
    }).then(() => {
      navigation.navigate('Confirmation', {
        title: 'Conta criada',
        message: 'Agora é só fazer login\ne aproveitar',
        nextScreenRoute: 'SignIn',
      });
    }).catch((error) => {
      Alert.alert('Opa', 'Não foi possível cadastrar');
      console.error('Erro no cadastro => ', error);
    });
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet />
              <Bullet active />
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
              value={password}
              onChangeText={setPassword}
            />
            <PasswordInput
              iconName="lock"
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              placeholder="Repetir senha"
              value={passwordConfirm}
              onChangeText={setPasswordConfirm}
            />
          </Form>
          <Button
            title="Cadastrar"
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}