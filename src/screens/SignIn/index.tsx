import React from 'react';
import { Button } from '../../components/Button';
import theme from '../../styles/theme';

import {
  Container, 
  Header, 
  Title,
  SubTitle,
  Footer
} from './styles';

export function SignIn(){
  return (
    <Container>
      <Header>
        <Title>Estamos{`\n`}quase lá.</Title>
        <SubTitle>Faça seu login para começar{`\n`}uma esperiência incrível.</SubTitle>
      </Header>
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