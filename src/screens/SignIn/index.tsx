import React from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import theme from '../../styles/theme';

import {
  Container, 
  Header, 
  Title,
  SubTitle,
  Form,
  Footer
} from './styles';

export function SignIn(){
  return (
    <Container>
      <Header>
        <Title>Estamos{`\n`}quase lá.</Title>
        <SubTitle>Faça seu login para começar{`\n`}uma esperiência incrível.</SubTitle>
      </Header>
      <Form>
        <Input 
          iconName="mail"
          placeholder="E-mail"
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
        />
        <Input iconName="lock" />
      </Form>
      <Footer>
        <Button
          title="Login"
          onPress={() => {}}
          enabled={false}
          loading={false}
        />
        <Button
          title="Cadastrar gratuitamente"
          color={theme.colors.background_secondary}
          onPress={() => {}}
          light
          loading={false}
        />
      </Footer>
    </Container>
  );
}