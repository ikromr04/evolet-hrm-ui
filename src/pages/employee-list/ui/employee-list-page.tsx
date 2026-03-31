import { useHeader } from '@/shared/lib';
import { JSX, useEffect } from 'react';

function EmployeeListPage(): JSX.Element {
  const { setTitle } = useHeader();

  useEffect(() => {
    setTitle('Справочник сотрудников');
  }, [setTitle]);

  return (
    <main>
      Employees page
    </main>
  );
}

export { EmployeeListPage };
