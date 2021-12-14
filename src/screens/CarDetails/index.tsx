import React from 'react';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import {
  Container,
  Header,
  CarImages
} from './styles';

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
    </Container>
  );
}