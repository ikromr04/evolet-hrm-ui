import { HeaderContext } from '@/shared/lib';
import { useState, ReactNode } from 'react';

const HeaderProvider = ({ children }: { children: ReactNode }) => {
  const [title, setTitle] = useState('');

  return (
    <HeaderContext.Provider value={{ title, setTitle }}>
      {children}
    </HeaderContext.Provider>
  );
};

export { HeaderProvider };
