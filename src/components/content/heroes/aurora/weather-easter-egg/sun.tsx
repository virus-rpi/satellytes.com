import SUN from '../../../../../assets/images/aurora/sun.png';
import REFLECTION from '../../../../../assets/images/aurora/sun-reflection.png';
import SUNSHINE from '../../../../../assets/images/aurora/sun-shine.png';
import styled, { keyframes } from 'styled-components';
import { useEffect, useState } from 'react';
import React from 'react';
import { getSunTime } from './weather-api';
import { getSunlightPercentage } from './sun-percentage-calculator';
import { Flare, FlareType } from '../flare';
import { DefaultFlares } from '../default-flares';

interface bgProps {
  time: number;
  sunrise: number;
  sunset: number;
}

const rotatingAnimation = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const sunBackgroundAnimation = keyframes`
  0% {
    width: 500%;
    height: 500%;
    transform: translate(-25%, -25%);
  }
  7% {
    width: 0;
    height: 0;
  }
  93% {
    width: 0;
    height: 0;
  }
  100% {
    width: 500%;
    height: 500%;
    transform: translate(-25%, -25%);
  }
  `;

const backgroundAnimation = keyframes`
  0% {
    opacity: .7;
  }
  7% {
    opacity: 0;
  }
  93% {
    opacity: 0;
  }
  100% {
    opacity: .7;
  }
`;

const SunBackgroundDiv = styled.div<bgProps>`
  position: relative;
  background: radial-gradient(
    circle at 50% 50%,
    #ff6a00c4 0%,
    #ff6a00c4 50%,
    #ffffff00 100%
  );

  animation: ${sunBackgroundAnimation}
    ${(props) => (props.sunset - props.sunrise) / 1000}s linear infinite;
  animation-delay: ${(props) =>
    `-${((props.time / 100) * (props.sunset - props.sunrise)) / 1000}s`};
  z-index: -1;
  opacity: 0.7;
  border-radius: 500%;
  filter: blur(200px);
`;

const BackgroundDiv = styled.div<bgProps>`
  position: absolute;
  width: 100%;
  height: 120%;
  top: 0;
  left: 0;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgb(255, 38, 38) 100%
  );
  z-index: -2;
  animation: ${backgroundAnimation}
    ${(props) => (props.sunset - props.sunrise) / 1000}s linear infinite;
  animation-delay: ${(props) =>
    `-${((props.time / 100) * (props.sunset - props.sunrise)) / 1000}s`};
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
        (1 / 125) * (-(props.timePercent - 50) * (props.timePercent - 50)) +
        60}%
      // parabola formula to get the sun to move in a parabola
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
  background-image: url(${REFLECTION});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  display: inline-block;
  width: 549.5px;
  height: 539px;
  left: calc(
    ${(props) => props.timePercent}% +
      ${(props) => (props.timePercent - 50) / 2}% - 274.75px
      // linear formula to control the speed of the sun reflection
  );
  bottom: calc(
    ${(props) =>
        (1 / 350) *
          -Math.pow(
            (props.timePercent + (props.timePercent - 50) / 2) * 2 - 100, // parabola formula to get the sun reflection to move in a parabola
            2,
          ) +
        60}% - 100px
  );
  position: absolute;
`;

export const Sun = () => {
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

    if (sunrise === 0 || sunset === 0)
      fetchData().catch((e) => console.error(e));

    const interval = setInterval(() => {
      setTime(getSunlightPercentage(sunrise, sunset));
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [sunset, sunrise, time]);

  return (
    <>
      <BackgroundDiv time={time} sunrise={sunrise} sunset={sunset} />
      <AuroraSunDiv timePercent={time}>
        <SunBackgroundDiv time={time} sunrise={sunrise} sunset={sunset} />
        <AuroraSunShineDiv />
      </AuroraSunDiv>
      <AuroraSunReflectionDiv timePercent={time} />
      <Flare
        stepSize={0}
        flareType={FlareType.LIGHT}
        x={'70vw'}
        y={'300px'}
        size={100}
        rotation={80}
        animationOffset={14}
      />
      <Flare
        stepSize={20}
        flareType={FlareType.LIGHT}
        x={'50vw'}
        y={'50vw'}
        size={150}
        rotation={30}
        animationOffset={3}
      />
      <DefaultFlares />
    </>
  );
};
