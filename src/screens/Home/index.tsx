import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import {
  Container,
  Title,
  Header,
  HeaderContent,
  TotalCars
} from './styles';

import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';

export function Home(){
  const carDataOne = {
    brand: 'Audi',
    name: 'RS 5 Coupé',
    rent: {
      period: 'AO DIA',
      price: 120,
    },
    thumbnail:'https://w7.pngwing.com/pngs/866/237/png-transparent-2018-toyota-corolla-toyota-matrix-car-opel-astra-2018-compact-car-sedan-subcompact-car.png'
  };

  const carDataTwo = {
    brand: 'Audi',
    name: 'RS 5 Coupé',
    rent: {
      period: 'AO DIA',
      price: 120,
    },
    thumbnail:'https://w7.pngwing.com/pngs/866/237/png-transparent-2018-toyota-corolla-toyota-matrix-car-opel-astra-2018-compact-car-sedan-subcompact-car.png'
  };

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo 
            width={RFValue(108)}
            height={RFValue(12)}
          />
          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>

      <Car data={carDataOne} />
      <Car data={carDataTwo} />
    </Container>
  );
}