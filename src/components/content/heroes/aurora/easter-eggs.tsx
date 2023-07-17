import React from 'react';
import useEasterEggs from './use-easter-eggs';

const EasterEggs = () => {
  const { easterEggs } = useEasterEggs();

  return (
    <div>
      {easterEggs.map((EasterEgg, index) => (
        <EasterEgg key={index} />
      ))}
    </div>
  );
};

export default EasterEggs;
