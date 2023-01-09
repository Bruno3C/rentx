import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { useNavigation } from '@react-navigation/native';
import {useNetInfo} from '@react-native-community/netinfo';

import { database } from '../../database';
import { Car as ModelCar } from '../../database/model/Car';
import { synchronize } from '@nozbe/watermelondb/sync';
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
import { Button } from '../../components/Button';


export function Home(){
  const [cars, setCars] = useState<ModelCar[]>([]);
  const [loading, setLoading] = useState(true);
  const {navigate} = useNavigation();
  const netInfo = useNetInfo();

  function handleCarDetails(car: ModelCar) {
    navigate('CarDetails', { car });
  }

  async function offlineSynchronize() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const response = await api
        .get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);

        const { changes, latestVersion } = response.data;
        return { changes, timestamp: latestVersion }
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;
        await api.post('/users/sync', user);
      },
    });
  }

  useEffect(() => {
    let isMounted = true;
    async function fetchCars() {
      try {
        const carCollection = database.get<ModelCar>('cars');
        const cars = await carCollection.query().fetch();
        if(isMounted) {
          setCars(cars);
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
    if (netInfo.isConnected === true) {
      console.log('conectado');
      
      offlineSynchronize();
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
      <Button title="Sicronizar" onPress={offlineSynchronize} />
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