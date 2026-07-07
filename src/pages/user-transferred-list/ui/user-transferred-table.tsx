import { fetchTransferredUsersAction, getTransferredUsers, getTransferredUsersStatus } from '@/entities/user';
import { AsyncStatus, useAppDispatch, useAppSelector } from '@/shared/store';
import { JSX, useEffect, useMemo, useState } from 'react';
import { DataTable, TableSkeleton } from '@/shared/ui';
import { filterRows } from '../lib/filter-rows';
import { defaultFilter } from '../model/filter';
import { fetchProfilesAction, getProfiles, getProfilesStatus, Profile } from '@/entities/profile';
import { fetchRolesAction, getRoles, getRolesStatus, Role } from '@/entities/role';
import { fetchPositionsAction, getPositions, getPositionsStatus, Position } from '@/entities/position';
import { Department, fetchDepartmentsAction, getDepartments, getDepartmentsStatus } from '@/entities/department';
import { useUserColumns } from './columns';
import { UserTransferredFilter, UserTransferredRow } from '../model/types';

function UserTransferredTable(): JSX.Element {
  const dispatch = useAppDispatch();

  const transferredUsersStatus = useAppSelector(getTransferredUsersStatus);
  const profilesStatus = useAppSelector(getProfilesStatus);
  const rolesStatus = useAppSelector(getRolesStatus);
  const positionsStatus = useAppSelector(getPositionsStatus);
  const departmentsStatus = useAppSelector(getDepartmentsStatus);

  const transferredUsers = useAppSelector(getTransferredUsers);
  const profiles = useAppSelector(getProfiles);
  const roles = useAppSelector(getRoles);
  const positions = useAppSelector(getPositions);
  const departments = useAppSelector(getDepartments);

  const [filter, setFilter] = useState<UserTransferredFilter>(defaultFilter);
  const { columns } = useUserColumns({ filter, setFilter });

  useEffect(() => {
    if (transferredUsersStatus === AsyncStatus.IDLE) dispatch(fetchTransferredUsersAction());
    if (profilesStatus === AsyncStatus.IDLE) dispatch(fetchProfilesAction());
    if (rolesStatus === AsyncStatus.IDLE) dispatch(fetchRolesAction());
    if (positionsStatus === AsyncStatus.IDLE) dispatch(fetchPositionsAction());
    if (departmentsStatus === AsyncStatus.IDLE) dispatch(fetchDepartmentsAction());
  }, [departmentsStatus, dispatch, positionsStatus, profilesStatus, rolesStatus, transferredUsersStatus]);

  const rows: UserTransferredRow[] | undefined = useMemo(() => {
    if (transferredUsers && profiles && roles && positions && departments) {
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

      return transferredUsers.map((user) => ({
        ...user,
        profile: profilesByUserId[user.id],
        roles: user.roles.map((id) => rolesById[id]),
        positions: user.positions.map((id) => positionsById[id]),
        departments: user.departments.map((id) => departmentsById[id]),
      }));
    }
  }, [departments, transferredUsers, positions, profiles, roles]);
// console.log(transferredUsers);

  if (!rows) return <TableSkeleton />;

  return (
    <DataTable
      className="h-[calc(100vh-125px)]"
      data={filterRows(rows, filter)}
      columns={columns}
      searchValue={filter.keyword}
      onSearch={(value) => setFilter((prev) => ({ ...prev, keyword: value }))}
      filterResetable={JSON.stringify(filter) !== JSON.stringify(defaultFilter)}
      onFilterReset={() => setFilter(defaultFilter)}
    />
  );
}

export { UserTransferredTable };
