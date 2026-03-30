import { createContext, useContext } from 'react';

type HeaderContextType = {
  title: string;
  setTitle: (title: string) => void;
};

const HeaderContext = createContext<HeaderContextType>({
  title: '',
  setTitle: () => { },
});

const useHeader = () => useContext(HeaderContext);

export { type HeaderContextType, HeaderContext, useHeader };
