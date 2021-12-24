import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { BackButton } from '../../../components/BackButton';
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle
} from './styles';
import { Bullet } from '../../../components/Bullet';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

export function SignUpFirstStep(){
  const navigation = useNavigation();

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
          <FormTitle>1. Dados</FormTitle>
          <Input
            iconName="user"
            placeholder="Nome"
          />
          <Input
            iconName="mail"
            placeholder="E-mail"
          />
          <Input
            iconName="credit-card"
            placeholder="CNH"
          />
        </Form>
        <Button
          title="Proximo"
          onPress={() => {}}
        />
      </Container>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}