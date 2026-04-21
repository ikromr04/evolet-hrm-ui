import { fetchUsersAction, getUsers, getUsersStatus } from '@/entities/user';
import { useHeader } from '@/shared/lib';
import { AsyncStatus, useAppDispatch, useAppSelector } from '@/shared/store';
import { JSX, useEffect, useMemo, useState } from 'react';
import { DataTable } from '@/shared/ui';
import { Filter, Row } from '../model/types';
import { useUserColumns } from './columns';
import { filterRows } from '../lib/filter-rows';
import { defaultFilter } from '../model/filter';
import { TableLoadingSkeleton } from './table-loading-skeleton';
import { fetchProfilesAction, getProfiles, getProfilesStatus, Profile } from '@/entities/profile';
import { fetchRolesAction, getRoles, getRolesStatus, Role } from '@/entities/role';
import { fetchPositionsAction, getPositions, getPositionsStatus, Position } from '@/entities/position';
import { Department, fetchDepartmentsAction, getDepartments, getDepartmentsStatus } from '@/entities/department';

function UserListPage(): JSX.Element {
  const { setTitle } = useHeader();
  const dispatch = useAppDispatch();

  const usersStatus = useAppSelector(getUsersStatus);
  const profilesStatus = useAppSelector(getProfilesStatus);
  const rolesStatus = useAppSelector(getRolesStatus);
  const positionsStatus = useAppSelector(getPositionsStatus);
  const departmentsStatus = useAppSelector(getDepartmentsStatus);

  const users = useAppSelector(getUsers);
  const profiles = useAppSelector(getProfiles);
  const roles = useAppSelector(getRoles);
  const positions = useAppSelector(getPositions);
  const departments = useAppSelector(getDepartments);

  const [filter, setFilter] = useState<Filter>(defaultFilter);
  const { columns } = useUserColumns({ filter, setFilter });

  useEffect(() => {
    setTitle('Справочник сотрудников');
    if (usersStatus === AsyncStatus.IDLE) dispatch(fetchUsersAction());
    if (profilesStatus === AsyncStatus.IDLE) dispatch(fetchProfilesAction());
    if (rolesStatus === AsyncStatus.IDLE) dispatch(fetchRolesAction());
    if (positionsStatus === AsyncStatus.IDLE) dispatch(fetchPositionsAction());
    if (departmentsStatus === AsyncStatus.IDLE) dispatch(fetchDepartmentsAction());
  }, [departmentsStatus, dispatch, positionsStatus, profilesStatus, rolesStatus, setTitle, usersStatus]);

  const rows: Row[] | null = useMemo(() => {
    if (users && profiles && roles && positions && departments) {
      const profilesByUserId = profiles.reduce((acc, profile) => {
        acc[profile.userId] = profile;
        return acc;
      }, {} as Record<string, Profile>);

      const rolesById = roles.reduce((acc, role) => {
        acc[role.id] = role;
        return acc;
      }, {} as Record<string, Role>);

      const positionsById = positions.reduce((acc, position) => {
        acc[position.id] = position;
        return acc;
      }, {} as Record<string, Position>);

      const departmentsById = departments.reduce((acc, department) => {
        acc[department.id] = department;
        return acc;
      }, {} as Record<string, Department>);

      return users.map((user) => ({
        ...user,
        profile: profilesByUserId[user.id],
        roles: user.roles.map((id) => rolesById[id]),
        positions: user.positions.map((id) => positionsById[id]),
        departments: user.departments.map((id) => departmentsById[id]),
      }));
    }
    return null;
  }, [departments, positions, profiles, roles, users]);

  return (
    <main className="@container/main flex flex-1 flex-col gap-2">
      {rows ? (
        <DataTable
          className="max-h-[calc(100vh-141px)]"
          data={filterRows(rows, filter)}
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
