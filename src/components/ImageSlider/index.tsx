import React from 'react';

import {
  Container,
  ImageIndexes,
  ImageIndex,
  CarImageWrapper,
  CarImage,
} from './styles';

import CarPng from '../../assets/placeholder_car.png';

interface Props {
  imagesUrl: string[];
}

export function ImageSlider({imagesUrl}:Props){
  return (
    <Container>
      <ImageIndexes>
        <ImageIndex active={true} />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
      </ImageIndexes>

      <CarImageWrapper>
        <CarImage
          source={CarPng}
          resizeMode="contain"
        />
      </CarImageWrapper>
    </Container>
  );
}