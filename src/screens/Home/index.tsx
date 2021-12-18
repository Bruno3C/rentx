import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { useNavigation } from '@react-navigation/native';
import { api } from '../../services/api';

import { CarDTO } from '../../dtos/CarDTO';

import {
  Container,
  Title,
  Header,
  HeaderContent,
  TotalCars,
  CardList
} from './styles';

import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';
import { Load } from '../../components/Load';

export function Home(){
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const {navigate} = useNavigation();

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

  function handleCarDetails() {
    navigate('CarDetails');
  }

  useEffect(() => {
    async function fetchCars() {
      setLoading(true);
      try {
        const response = await api.get('/cars');
        console.log('response => ', response.data);
        setCars(response.data);
      } catch (error) {
        console.log('error => ', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

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
      {
        loading? <Load /> : 
        <CardList
         data={cars}
         keyExtractor={(item) => item.id}
         renderItem={({item }) => 
           <Car 
             data={item}
             onPress={handleCarDetails}
           />
         }
        />
      }

    </Container>
  );
}