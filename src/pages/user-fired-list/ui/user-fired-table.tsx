import { fetchFiredUsersAction, getFiredUsers, getFiredUsersStatus } from '@/entities/user';
import { AsyncStatus, useAppDispatch, useAppSelector } from '@/shared/store';
import { JSX, useEffect, useMemo, useState } from 'react';
import { DataTable, TableSkeleton } from '@/shared/ui';
import { UserFiredFilter, UserFiredRow } from '../model/types';
import { filterRows } from '../lib/filter-rows';
import { defaultFilter } from '../model/filter';
import { fetchProfilesAction, getProfiles, getProfilesStatus, Profile } from '@/entities/profile';
import { fetchRolesAction, getRoles, getRolesStatus, Role } from '@/entities/role';
import { fetchPositionsAction, getPositions, getPositionsStatus, Position } from '@/entities/position';
import { Department, fetchDepartmentsAction, getDepartments, getDepartmentsStatus } from '@/entities/department';
import { useUserColumns } from './columns';

function UserFiredTable(): JSX.Element {
  const dispatch = useAppDispatch();

  const firedUsersStatus = useAppSelector(getFiredUsersStatus);
  const profilesStatus = useAppSelector(getProfilesStatus);
  const rolesStatus = useAppSelector(getRolesStatus);
  const positionsStatus = useAppSelector(getPositionsStatus);
  const departmentsStatus = useAppSelector(getDepartmentsStatus);

  const firedUsers = useAppSelector(getFiredUsers);
  const profiles = useAppSelector(getProfiles);
  const roles = useAppSelector(getRoles);
  const positions = useAppSelector(getPositions);
  const departments = useAppSelector(getDepartments);

  const [filter, setFilter] = useState<UserFiredFilter>(defaultFilter);
  const { columns } = useUserColumns({ filter, setFilter });

  useEffect(() => {
    if (firedUsersStatus === AsyncStatus.IDLE) dispatch(fetchFiredUsersAction());
    if (profilesStatus === AsyncStatus.IDLE) dispatch(fetchProfilesAction());
    if (rolesStatus === AsyncStatus.IDLE) dispatch(fetchRolesAction());
    if (positionsStatus === AsyncStatus.IDLE) dispatch(fetchPositionsAction());
    if (departmentsStatus === AsyncStatus.IDLE) dispatch(fetchDepartmentsAction());
  }, [departmentsStatus, dispatch, firedUsersStatus, positionsStatus, profilesStatus, rolesStatus]);

  const rows: UserFiredRow[] | undefined = useMemo(() => {
    if (firedUsers && profiles && roles && positions && departments) {
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

      return firedUsers.map((user) => ({
        ...user,
        profile: profilesByUserId[user.id],
        roles: user.roles.map((id) => rolesById[id]),
        positions: user.positions.map((id) => positionsById[id]),
        departments: user.departments.map((id) => departmentsById[id]),
      }));
    }
  }, [departments, firedUsers, positions, profiles, roles]);

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

export { UserFiredTable };
