import { DeferredRender, TableSkeleton } from '@/shared/ui';
import { JSX, lazy } from 'react';

const UsersTable = lazy(() => import('./users-table').then((module) => ({ default: module.UsersTable })));

function UserList(): JSX.Element {
  return (
    <main className="flex flex-1 flex-col gap-2">
      <DeferredRender fallback={<TableSkeleton />}>
        <UsersTable />
      </DeferredRender>
    </main>
  );
}

export { UserList };
