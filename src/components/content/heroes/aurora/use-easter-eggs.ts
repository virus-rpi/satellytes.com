import { useState, useEffect } from 'react';

declare const require: {
  context(
    path: string,
    deep?: boolean,
    filter?: RegExp,
  ): {
    keys(): string[];
    <T>(id: string): T;
  };
};

interface EasterEggModule {
  [key: string]: any;
}

const useEasterEggs = () => {
  const [easterEggs, setEasterEggs] = useState<any[]>([]);
  const [enabledEasterEggs, setEnabledEasterEggs] = useState<any[]>([]);
  const [easterEggBackgrounds, setEasterEggBackgrounds] = useState<any>({});

  useEffect(() => {
    const importEasterEggs = async () => {
      const folders = require.context(
        '.',
        true,
        /\/([^-]+)-easter-egg\/\1-easter-egg\.tsx$/,
      );
      const files = folders.keys();

      for (const file of files) {
        const module: EasterEggModule = await folders(file);

        const filteredFunctions = Object.values(module).filter(
          (value: any) =>
            typeof value === 'function' && value.name.includes('EasterEgg'),
        );

        for (const func of filteredFunctions) {
          if (easterEggs.find((easterEgg) => easterEgg.name === func.name)) {
            continue;
          }
          setEasterEggs((prevEasterEggs) => [...prevEasterEggs, func]);

          const customBackground = module[`${func.name}CustomBackground`];
          if (customBackground) {
            setEasterEggBackgrounds((prevBackgrounds) => ({
              ...prevBackgrounds,
              [func.name]: customBackground,
            }));
          }
        }
      }
    };

    importEasterEggs().catch((error) => {
      console.error('Error importing Easter eggs:', error);
    });
  }, []);

  const enableEasterEgg = (name: string) => {
    if (enabledEasterEggs.includes(name)) {
      return;
    }
    setEnabledEasterEggs((prevEnabledEasterEggs) => [
      ...prevEnabledEasterEggs,
      name,
    ]);
  };

  const disableEasterEgg = (name: string) => {
    setEnabledEasterEggs((prevEnabledEasterEggs) =>
      prevEnabledEasterEggs.filter(
        (enabledEasterEgg) => enabledEasterEgg !== name,
      ),
    );
  };

  const isEasterEggEnabled = (name: string) => {
    return enabledEasterEggs.includes(name);
  };

  const getCustomBackground = () => {
    for (const easterEgg of enabledEasterEggs) {
      const background = easterEggBackgrounds[easterEgg];
      if (background) {
        return background();
      }
    }
    return null;
  };

  return {
    easterEggs,
    enableEasterEgg,
    disableEasterEgg,
    isEasterEggEnabled,
    enabledEasterEggs,
    getCustomBackground,
  };
};

export default useEasterEggs;
