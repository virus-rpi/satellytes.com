import React, { useEffect, useState } from 'react';
import useEasterEggs from './use-easter-eggs';

const EasterEggs = () => {
  const { easterEggs } = useEasterEggs();
  const [allEasterEggs, setAllEasterEggs] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    setAllEasterEggs(
      easterEggs.map((EasterEgg, index) => <EasterEgg key={index} />),
    );
  }, [easterEggs]);

  return <div>{allEasterEggs}</div>;
};

export default EasterEggs;
