import SUN from '../../../../assets/images/aurora/sun.png';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import React from 'react';
import { getSunTime } from './weather-api';

export function getSunlightPercentage(sunriseTime, sunsetTime): number {
  const time = new Date();

  const totalDaylightMinutes =
    (sunsetTime.getTime() - sunriseTime.getTime()) / (1000 * 60);
  const currentMinutes = (time.getTime() - sunriseTime.getTime()) / (1000 * 60);
  const sunlightPercentage = (currentMinutes / totalDaylightMinutes) * 100;

  return Math.round(sunlightPercentage);
}

const AuroraSunDiv = styled.div<{ timePercent: number }>`
  background-image: url(${SUN});
  left: calc(${(props) => props.timePercent}% - 418.5px);
  bottom: calc(
    ${(props) =>
        (1 / 50) * (-(props.timePercent - 50) * (props.timePercent - 50)) +
        50}% - 200px
  );
  position: absolute;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  display: inline-block;
  width: 837px;
  height: 640px;
`;

export const AuroraSun = () => {
  const [time, setTime] = useState(0);
  const [sunrise, setSunrise] = useState(new Date());
  const [sunset, setSunset] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => await getSunTime();
    const time = fetchData();
    time.then((value) => {
      setSunrise(value.sunriseTime);
      setSunset(value.sunsetTime);
    });
    setTime(getSunlightPercentage(sunrise, sunset));
  });

  return <AuroraSunDiv timePercent={time} />;
};
