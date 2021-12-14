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
} from './styles';
import { Accessory } from '../../components/Accessory';

export function CarDetails(){

  const imageUrl = [
    'https://w7.pngwing.com/pngs/38/708/png-transparent-car-mercedes-car-love-compact-car-vehicle-thumbnail.png'
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
          <Accessory name="a" icon={speedSvg} />
          <Accessory name="b" icon={accelerationSvg} />
          <Accessory name="c" icon={forceSvg} />
          <Accessory name="d" icon={gasolineSvg} />
          <Accessory name="e" icon={exchangeSvg} />
          <Accessory name="f" icon={peopleSvg} />
        </Accessories>

        <About>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam blandit tincidunt lacinia.
        Ut sem est, varius non cursus ac, efficitur eu lacus. 
        Vivamus faucibus quis eros sit amet suscipit. 
        </About>
      </Content>
    </Container>
  );
}