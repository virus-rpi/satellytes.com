import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Aurora, AuroraType, WeatherType } from './aurora/aurora';
import styled from 'styled-components';
import { HeroWithText } from './hero-text';

const API_KEY = process.env.WEATHER_API_KEY;
const latitude = 48.1351;
const longitude = 11.582;

const AuroraFullSize = styled(Aurora)`
  grid-area: 1/1;
`;

interface AuroraHeroProps extends HeroWithText {
  auroraType?: AuroraType;
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

const EasterEgg = ({ auroraType }: AuroraHeroProps) => {
  const [weather, setWeather] = useState(WeatherType.NotSet);

  const activateEasterEgg = async () => {
    const weatherData = await getWeather(latitude, longitude);
    setWeather(weatherData as WeatherType);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if the shortcut is pressed (Ctrl + Alt + Shift)
      console.log('Key pressed:', event.key);
      if (event.ctrlKey && event.altKey && event.shiftKey) {
        activateEasterEgg();
      }
    };

    // Attach the keydown event listener when the component mounts
    document.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div>
      <AuroraFullSize type={auroraType} weather={weather} />
    </div>
  );
};

export default EasterEgg;
