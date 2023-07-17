import { useEffect, useState } from 'react';
import { WeatherType } from './weather-types';
import { getWeather } from './weather-api';
import useEasterEggs from '../use-easter-eggs';

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherType>(WeatherType.NotSet);
  const { enableEasterEgg, disableEasterEgg } = useEasterEggs();

  const toggleWeather = () => {
    if (weather === WeatherType.NotSet) {
      getWeather()
        .then((weather) => {
          enableEasterEgg('weather');
          setWeather(weather);
        })
        .catch(() => {
          disableEasterEgg('weather');
          setWeather(WeatherType.NotSet);
        });
    } else {
      disableEasterEgg('weather');
      setWeather(WeatherType.NotSet);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.altKey && event.shiftKey) {
        toggleWeather();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return weather;
};
