import React, { useState } from 'react';
import styled from 'styled-components';
import { Aurora, AuroraType } from './aurora/aurora';
import { HeroContainer, TextContainer } from './support';
import { HeroText, HeroWithText } from './hero-text';
import axios from 'axios';

const API_KEY = process.env.WEATHER_API_KEY;

const AuroraFullSize = styled(Aurora)`
  grid-area: 1/1;
`;

interface AuroraHeroProps extends HeroWithText {
  auroraType?: AuroraType;
}

function getCoordinates(): { latitude: number; longitude: number } {
  return {
    latitude: 48.1351,
    longitude: 11.582,
  };
}

async function getWeather(
  latitude: number,
  longitude: number,
): Promise<string> {
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}`;

  try {
    const response = await axios.get(apiUrl);
    return response.data.current.condition.text;
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw new Error('Unable to fetch weather information.');
  }
}

export const AuroraHero = ({
  title,
  kicker,
  children,
  auroraType,
}: AuroraHeroProps) => {
  const [currentAuroraType, setCurrentAuroraType] = useState(auroraType);

  const activateEasterEgg = async () => {
    console.log('Easter egg activated');
    const coords = getCoordinates();
    const weather = await getWeather(coords.latitude, coords.longitude);
    console.log('Weather:', weather);
    setCurrentAuroraType(weather as AuroraType);
  };

  return (
    <HeroContainer>
      <AuroraFullSize type={currentAuroraType} />

      <TextContainer>
        <HeroText title={title} kicker={kicker}>
          {children}
        </HeroText>
        <button style={{ opacity: 0 }} onClick={activateEasterEgg}></button>
      </TextContainer>
    </HeroContainer>
  );
};
