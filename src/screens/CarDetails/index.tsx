import React from 'react';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import speedSvg from '../../assets/speed.svg';
import accelerationSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasolineSvg from '../../assets/gasoline.svg';
import exchangeSvg from '../../assets/exchange.svg';
import peopleSvg from '../../assets/people.svg';

import { useNavigation, useRoute } from '@react-navigation/native';

import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

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
  About,
  Footer
} from './styles';
import { CarDTO } from '../../dtos/CarDTO';

interface Params {
  car: CarDTO;
}


export function CarDetails(){

  const { navigate, goBack } = useNavigation();
  const route = useRoute();
  const { car } = route.params as Params;

  function handleConfirmRental() {
    navigate('Scheduling');
  }

  function handleBack() {
    goBack();
  }

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
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {
            car.accessories.map(accessory => (
              <Accessory
                key={accessory.type} 
                name={accessory.name} 
                icon={speedSvg} 
              />
            ))
          }
        </Accessories>

        <About>
          {car.about}
        </About>
      </Content>

      <Footer>
        <Button title='Escolher período do aluguel' onPress={handleConfirmRental} />
      </Footer>
    </Container>
  );
}