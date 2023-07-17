import { WeatherType } from './weather-types';
import { DefaultFlares, foregroundByWeather } from '../aurora-components';
import React from 'react';
import { useWeather } from './use-weather';
export const WeatherEasterEgg = () => {
  const weather = useWeather();

  return (
    <>
      {foregroundByWeather[weather || WeatherType.NotSet]}
      {weather !== WeatherType.Cloudy && <DefaultFlares />}
    </>
  );
};
