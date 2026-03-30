import { useHeader } from '@/shared/lib';
import { JSX, useEffect } from 'react';

function HomePage(): JSX.Element {
  const { title, setTitle } = useHeader();

  useEffect(() => {
    setTitle('Главная');
  }, [setTitle]);

  return (
    <main>
      <h1 className="text-2xl font-bold">{title}</h1>
    </main>
  );
}

export { HomePage };
