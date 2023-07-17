import { useState } from 'react';
import { WeatherType } from './weather-types';

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherType>(WeatherType.NotSet);
  console.log('weather', weather);

  return { weather, setWeather };
};
