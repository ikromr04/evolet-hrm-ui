import { useHeader } from '@/shared/lib';
import { JSX, useEffect } from 'react';

function UserListPage(): JSX.Element {
  const { setTitle } = useHeader();

  useEffect(() => {
    setTitle('Справочник сотрудников');
  }, [setTitle]);

  return (
    <main>
      Users page
    </main>
  );
}

export { UserListPage };
