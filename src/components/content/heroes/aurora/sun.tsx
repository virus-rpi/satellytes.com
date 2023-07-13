import SUN from '../../../../assets/images/aurora/sun.png';
import SUNREFLECTION from '../../../../assets/images/aurora/sun-reflection.png';
import SUNSHINE from '../../../../assets/images/aurora/sun-shine.png';
import styled, { keyframes } from 'styled-components';
import { useEffect, useState } from 'react';
import React from 'react';
import { getSunTime } from './weather-api';

function getSunlightPercentage(sunriseTime, sunsetTime) {
  const time = new Date();

  const totalDaylightMinutes = (sunsetTime - sunriseTime) / (1000 * 60);
  const currentMinutes = (time.getTime() - sunriseTime) / (1000 * 60);
  const sunlightPercentage = (currentMinutes / totalDaylightMinutes) * 100;

  return Math.round(sunlightPercentage);
}

const rotatingAnimation = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const AuroraSunShineDiv = styled.div`
  background-image: url(${SUNSHINE});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  animation: ${rotatingAnimation} 60s linear infinite;
  width: 200%;
  height: 200%;
  left: -50%;
  top: -50%;
  position: absolute;
`;

const AuroraSunDiv = styled.div<{ timePercent: number }>`
  left: calc(${(props) => props.timePercent}% - 167.5px);
  bottom: calc(
    ${(props) =>
      (1 / 125) * (-(props.timePercent - 50) * (props.timePercent - 50)) + 60}%
  );
  position: absolute;
  background-image: url(${SUN});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  display: inline-block;
  width: 335px;
  height: 335px;
`;

const AuroraSunReflectionDiv = styled.div<{ timePercent: number }>`
  background-image: url(${SUNREFLECTION});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  display: inline-block;
  width: 549.5px;
  height: 539px;
  left: calc(
    ${(props) => props.timePercent}% +
      ${(props) => (props.timePercent - 50) / 2}% - 274.75px
  );
  bottom: calc(
    ${(props) =>
        (1 / 350) *
          -Math.pow(
            (props.timePercent + (props.timePercent - 50) / 2) * 2 - 100,
            2,
          ) +
        60}% - 100px
  );
  position: absolute;
`;

export const AuroraSun = () => {
  const [time, setTime] = useState(0);
  const [sunrise, setSunrise] = useState(0);
  const [sunset, setSunset] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { sunriseTime, sunsetTime } = await getSunTime();
      setSunrise(sunriseTime);
      setSunset(sunsetTime);
      setTime(getSunlightPercentage(sunriseTime, sunsetTime));
    };

    fetchData();

    const interval = setInterval(() => {
      setTime(getSunlightPercentage(sunrise, sunset));
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <AuroraSunDiv timePercent={time}>
        <AuroraSunShineDiv />
      </AuroraSunDiv>
      <AuroraSunReflectionDiv timePercent={time} />
    </>
  );
};
