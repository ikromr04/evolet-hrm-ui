import { DeferredRender, TableSkeleton } from '@/shared/ui';
import { JSX } from 'react';
import { UserTransferredTable } from './user-transferred-table';

function UserTransferredList(): JSX.Element {
  return (
    <main className="flex flex-1 flex-col gap-2">
      <DeferredRender fallback={<TableSkeleton />}>
        <UserTransferredTable />
      </DeferredRender>
    </main>
  );
}

export { UserTransferredList };
