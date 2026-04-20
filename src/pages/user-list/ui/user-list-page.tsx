import { fetchUsersAction, getUsers, getUsersStatus } from '@/entities/user';
import { useHeader } from '@/shared/lib';
import { AsyncStatus, useAppDispatch, useAppSelector } from '@/shared/store';
import { JSX, useEffect, useState } from 'react';
import { DataTable } from '@/shared/ui';
import { Filter } from '../model/types';
import { useUserColumns } from './columns';
import { filterRows } from '../lib/filter-rows';
import { defaultFilter } from '../model/filter';
import { TableLoadingSkeleton } from './table-loading-skeleton';

function UserListPage(): JSX.Element {
  const { setTitle } = useHeader();
  const dispatch = useAppDispatch();

  const usersStatus = useAppSelector(getUsersStatus);
  const users = useAppSelector(getUsers);

  const [filter, setFilter] = useState<Filter>(defaultFilter);
  const { columns } = useUserColumns({ filter, setFilter });

  useEffect(() => {
    setTitle('Справочник сотрудников');
    if (usersStatus === AsyncStatus.IDLE) dispatch(fetchUsersAction());
  }, [dispatch, setTitle, usersStatus]);

  return (
    <main className="@container/main flex flex-1 flex-col gap-2">
      {users ? (
        <DataTable
          className="max-h-[calc(100vh-141px)]"
          data={filterRows(users, filter)}
          columns={columns}
          searchValue={filter.keyword}
          onSearch={(value) => setFilter((prev) => ({ ...prev, keyword: value }))}
          filterResetable={JSON.stringify(filter) !== JSON.stringify(defaultFilter)}
          onFilterReset={() => setFilter(defaultFilter)}
        />
      ) : <TableLoadingSkeleton />}
    </main>
  );
}

export { UserListPage };
