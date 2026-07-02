import { DeferredRender, TableSkeleton } from '@/shared/ui';
import { JSX } from 'react';
import { UserFiredTable } from './user-fired-table';

function UserFiredList(): JSX.Element {
  return (
    <main className="flex flex-1 flex-col gap-2">
      <DeferredRender fallback={<TableSkeleton />}>
        <UserFiredTable />
      </DeferredRender>
    </main>
  );
}

export { UserFiredList };
