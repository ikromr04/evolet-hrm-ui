import { useTheme } from '@/shared/lib';
import { Button } from '@/shared/ui';
import { Moon, Sun } from 'lucide-react';
import { JSX } from 'react';

function ModeToggle(): JSX.Element {
  const { theme, setTheme } = useTheme();

  const onClick = () => {
    if (theme === 'dark') {
      setTheme('light');
      return;
    }
    setTheme('dark');
  };

  return (
    <Button variant="outline" size="icon" onClick={onClick}>
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Сменить тему</span>
    </Button>
  );
}

export { ModeToggle };
