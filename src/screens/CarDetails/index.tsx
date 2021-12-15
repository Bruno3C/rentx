import React from 'react';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import speedSvg from '../../assets/speed.svg';
import accelerationSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasolineSvg from '../../assets/gasoline.svg';
import exchangeSvg from '../../assets/exchange.svg';
import peopleSvg from '../../assets/people.svg';

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
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

export function CarDetails(){

  const imageUrl = [
    'https://toppng.com/uploads/preview/car-115450452480adfbyu2mv.png'
  ];

    return (
    <Container>
      <Header>
        <BackButton
          onPress={() => {}}
        />
      </Header>
      <CarImages>
        <ImageSlider 
          imagesUrl={[imageUrl[0]]}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>Lamborghini</Brand>
            <Name>Huracan</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 580</Price>
          </Rent>
        </Details>

        <Accessories>
          <Accessory name="380Km/h" icon={speedSvg} />
          <Accessory name="3.2s" icon={accelerationSvg} />
          <Accessory name="800 HP" icon={forceSvg} />
          <Accessory name="Gasolina" icon={gasolineSvg} />
          <Accessory name="Auto" icon={exchangeSvg} />
          <Accessory name="2 Pessoas" icon={peopleSvg} />
        </Accessories>

        <About>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam blandit tincidunt lacinia.
          Ut sem est, varius non cursus ac, efficitur eu lacus. 
          Vivamus faucibus quis eros sit amet suscipit. 
        </About>
      </Content>

      <Footer>
        <Button title='Continuar' />
      </Footer>
    </Container>
  );
}