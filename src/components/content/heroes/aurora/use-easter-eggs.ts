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

const useEasterEggs = () => {
  const [easterEggs, setEasterEggs] = useState<any[]>([]);
  const [enabledEasterEggs, setEnabledEasterEggs] = useState<any[]>([]);

  useEffect(() => {
    const importEasterEggs = async () => {
      const folders = require.context('.', true, /easter-egg.*\/[^/]+\.jsx?$/);
      const files = folders.keys();

      for (const file of files) {
        const module: any = await folders(file);
        const defaultExport = module.default;

        if (
          typeof defaultExport === 'function' &&
          defaultExport.prototype.isReactComponent
        ) {
          setEasterEggs((prevEasterEggs) => [...prevEasterEggs, defaultExport]);
        }
      }
    };

    importEasterEggs().catch((error) => {
      console.error('Error importing Easter eggs:', error);
    });
  }, []);

  const enableEasterEgg = (name: string) => {
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

  return {
    easterEggs,
    enableEasterEgg,
    disableEasterEgg,
    isEasterEggEnabled,
    enabledEasterEggs,
  };
};

export default useEasterEggs;
