import { useState } from 'react';
import { WeatherType } from './weather-types';

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherType>(WeatherType.NotSet);

  return { weather, setWeather };
};
