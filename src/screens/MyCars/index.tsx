import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { CarDTO } from '../../dtos/CarDTO';
import { BackButton } from '../../components/BackButton';
import { AntDesign } from '@expo/vector-icons';
import { api } from '../../services/api';

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles';
import { FlatList } from 'react-native-gesture-handler';
import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
}

export function MyCars(){
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const { goBack } = useNavigation();

  function handleBack() {
    goBack();
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/schedules_byuser?user_id=1');
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton
          onPress={handleBack}
          color={theme.colors.shape}
        />
        <Title>
          Seus agendamentos, {`\n`} 
          estão aqui.
        </Title>
        <SubTitle>
          Conforto, segurança e praticidade.
        </SubTitle>
      </Header>
      {loading ? <LoadAnimation/> :
        <Content>
        <Appointments>
          <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
          <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
        </Appointments>

        <FlatList
          data={cars}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <CarWrapper>
              <Car data={item.car} />
              <CarFooter>
                <CarFooterTitle>PERÍODO</CarFooterTitle>
                <CarFooterPeriod>
                  <CarFooterDate>{item.startDate}</CarFooterDate>
                  <AntDesign 
                    name="arrowright"
                    size={15}
                    color={theme.colors.text}
                    style={{marginHorizontal: 10}}
                  />
                  <CarFooterDate>{item.endDate}</CarFooterDate>
                </CarFooterPeriod>
              </CarFooter>
            </CarWrapper>
          )}
        />
        </Content>
      }
    </Container>
  );
}