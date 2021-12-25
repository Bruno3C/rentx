import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { useNavigation } from '@react-navigation/native';
import {useNetInfo} from '@react-native-community/netinfo';
import { api } from '../../services/api';

import { CarDTO } from '../../dtos/CarDTO';
import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CardList,
} from './styles';


export function Home(){
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const {navigate} = useNavigation();
  const netInfo = useNetInfo();

  function handleCarDetails(car: CarDTO) {
    navigate('CarDetails', { car });
  }

  useEffect(() => {
    let isMounted = true;
    async function fetchCars() {
      try {
        const response = await api.get('/cars');
        if(isMounted) {
          setCars(response.data);
        }
      } catch (error) {
        console.log('error => ', error);
      } finally {
        if(isMounted) {
          setLoading(false);
        }
      }
    }
    fetchCars();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (netInfo.isConnected) {
      console.log('usuario conectado');
    } else {
      console.log('usuario desconectado');
    }
  }, [netInfo.isConnected]);

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
          {
            !loading && (<TotalCars>Total de {cars.length} carros</TotalCars>)
          }
        </HeaderContent>
      </Header>
      {
        loading? <LoadAnimation /> : 
        <CardList
         data={cars}
         keyExtractor={(item) => item.id}
         renderItem={({item }) => 
           <Car 
             data={item}
             onPress={() => handleCarDetails(item)}
           />
         }
        />
      }
    </Container>
  );
}