import { useTheme } from '@/shared/lib';
import { Button } from '@/shared/ui';
import { JSX } from 'react';

export function HomePage(): JSX.Element {
  const { setTheme } = useTheme();

  return (
    <main className="p-10">
      <p>
        <Button variant="secondary" onClick={() => setTheme('light')}>
          Light mode
        </Button>
      </p>
      <p>
        <Button variant="default" onClick={() => setTheme('dark')}>
          Dark mode
        </Button>
      </p>
    </main>
  );
}
