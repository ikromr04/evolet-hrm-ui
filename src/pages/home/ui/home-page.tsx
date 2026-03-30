import { useHeader } from '@/shared/lib';
import { JSX, useEffect } from 'react';

function HomePage(): JSX.Element {
  const { setTitle } = useHeader();

  useEffect(() => {
    setTitle('Главная');
  }, [setTitle]);

  return (
    <div>
      {/* <h1 className="text-2xl font-bold">{title}</h1> */}
    </div>
  );
}

export { HomePage };
