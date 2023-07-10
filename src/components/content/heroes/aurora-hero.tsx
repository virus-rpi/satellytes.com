import React from 'react';
import { AuroraType } from './aurora/aurora';
import { HeroContainer, TextContainer } from './support';
import { HeroText, HeroWithText } from './hero-text';
import EasterEgg from './easter-egg';

interface AuroraHeroProps extends HeroWithText {
  auroraType?: AuroraType;
}

export const AuroraHero = ({
  title,
  kicker,
  children,
  auroraType,
}: AuroraHeroProps) => {
  return (
    <HeroContainer>
      <EasterEgg auroraType={auroraType} title={title} />

      <TextContainer>
        <HeroText title={title} kicker={kicker}>
          {children}
        </HeroText>
      </TextContainer>
    </HeroContainer>
  );
};
