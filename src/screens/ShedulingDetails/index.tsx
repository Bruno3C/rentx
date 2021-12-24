import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native'; 

import { Feather } from '@expo/vector-icons';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { CarDTO } from '../../dtos/CarDTO';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { format, parseISO } from 'date-fns';
import { getPlatformDate } from '../../utils/getPlatformDate';

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
  Footer
} from './styles';
import { Alert } from 'react-native';
import { api } from '../../services/api';

interface Params {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriod {
  start: string;
  end: string;
}

export function ShedulingDetails(){
  const [loading, setLoading] = useState(false);
  const [ rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

  const route = useRoute();
  const { car, dates } = route.params as Params;
  const theme = useTheme();
  const { navigate, goBack } = useNavigation();

  async function handleConfirmRental() {
    setLoading(true);
    try {
      const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

      const unavailable_dates = [
        ...schedulesByCar.data.unavailable_dates,
        ...dates,
      ];

      await api.post('/schedules_byuser', {
        user_id: 1,
        car,
        startDate: rentalPeriod.start,
        endDate: rentalPeriod.end
      });

      await api.put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates
      });

      navigate('Confirmation', {
        title: 'Carro alugado!',
        message: 'Agora você só precisa ir \n' +
        'até a concessionária da RENTX \n' +
        'pegar o seu automóvel.',
        nextScreenRoute: 'Home',
      });
    } catch (error) {
      setLoading(false);
      Alert.alert('Não foi possível confirmar o agendamento.');
    }
  }

  function handleBack() {
    goBack();
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(parseISO(dates[0])), 'dd/MM/yyyy'),
      end: format(getPlatformDate(parseISO(dates[dates.length - 1])), 'dd/MM/yyyy')
    })
  }, []);

  return (
    <Container>
      <Header>
        <BackButton
          onPress={handleBack}
        />
      </Header>
      <CarImages>
        <ImageSlider 
          imagesUrl={car.photos}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {
            car.accessories.map(accessory => (
              <Accessory
                key={accessory.type} 
                name={accessory.name} 
                icon={getAccessoryIcon(accessory.type)} 
              />
            ))
          }
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(15)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>R$ {car.price} x{dates.length} diárias</RentalPriceQuota>
            <RentalPriceTotal>R$ {car.price * dates.length}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button 
          title='Alugar agora' 
          color={theme.colors.success} 
          onPress={handleConfirmRental}
          loading={loading}
          enabled={!loading}
        />
      </Footer>
    </Container>
  );
}