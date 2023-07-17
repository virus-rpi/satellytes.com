import { WeatherType } from './weather-types';
import { DefaultFlares, foregroundByWeather } from '../aurora-components';
import React, { useEffect } from 'react';
import { useWeather } from './use-weather';
import { getWeather } from './weather-api';
import useEasterEggs from '../use-easter-eggs';
export const WeatherEasterEgg = () => {
  const { weather, setWeather } = useWeather();
  const { enableEasterEgg, disableEasterEgg } = useEasterEggs();

  const toggleWeather = () => {
    if (weather === WeatherType.NotSet) {
      getWeather()
        .then((weather) => {
          enableEasterEgg('WeatherEasterEgg');
          setWeather(weather);
        })
        .catch(() => {
          disableEasterEgg('WeatherEasterEgg');
          setWeather(WeatherType.NotSet);
        });
    } else {
      disableEasterEgg('WeatherEasterEgg');
      setWeather(WeatherType.NotSet);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.altKey && event.shiftKey) {
        console.log('key');
        toggleWeather();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      {foregroundByWeather[weather || WeatherType.NotSet]}
      {weather !== WeatherType.Cloudy && <DefaultFlares />}
    </>
  );
};

export const customBackground = (weather) => {
  console.log('weather', weather);

  switch (weather) {
    case WeatherType.Sunny:
      return '#3E61EE';
    case WeatherType.Rainy:
      return '#9BA3BB';
    case WeatherType.NotSet:
      return null;
    default:
      return '#202840';
  }
};
