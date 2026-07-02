import { createContext, JSX, useContext } from 'react';
import { Button } from '../ui';
import { Moon, Sun } from 'lucide-react';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

function ThemeToggler(): JSX.Element {
  const { theme, setTheme } = useContext(ThemeProviderContext);

  const onClick = () => {
    if (theme === 'dark') {
      setTheme('light');
      return;
    }
    setTheme('dark');
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={onClick}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Сменить тему</span>
    </Button>
  );
}

export { type Theme, ThemeProviderContext, ThemeToggler };
