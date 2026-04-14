import { fetchUsersAction, getUsers, getUsersStatus } from '@/entities/user';
import { useHeader } from '@/shared/lib';
import { AsyncStatus, useAppDispatch, useAppSelector } from '@/shared/store';
import { JSX, useEffect, useMemo, useState } from 'react';
import { fetchProfilesAction, getProfiles, getProfilesStatus, Profile } from '@/entities/profile';
import { DataTable } from '@/shared/ui';
import { Filter } from '../model/types';
import { useUserColumns } from './columns';
import { filterRows } from '../lib/filter-rows';
import { defaultFilter } from '../model/filter';
import { fetchRolesAction, getRoles, getRolesStatus, Role } from '@/entities/role';
import { fetchPositionsAction, getPositions, getPositionsStatus, Position } from '@/entities/position';
import { Department, fetchDepartmentsAction, getDepartments, getDepartmentsStatus } from '@/entities/department';
import { TableLoadingSkeleton } from './table-loading-skeleton';

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

  const profilesByUserId = useMemo(() => {
    if (profiles) {
      return profiles.reduce<Record<string, Profile>>((acc, profile) => {
        acc[profile.userId] = profile;
        return acc;
      }, {});
    }
  }, [profiles]);

  const rolesById = useMemo(() => {
    if (roles) {
      return roles.reduce<Record<string, Role>>((acc, role) => {
        acc[role.id] = role;
        return acc;
      }, {});
    }
  }, [roles]);

  const positionsById = useMemo(() => {
    if (positions) {
      return positions.reduce<Record<string, Position>>((acc, position) => {
        acc[position.id] = position;
        return acc;
      }, {});
    }
  }, [positions]);

  const departmentsById = useMemo(() => {
    if (departments) {
      return departments.reduce<Record<string, Department>>((acc, department) => {
        acc[department.id] = department;
        return acc;
      }, {});
    }
  }, [departments]);

  const usersWithRelationships = useMemo(() => {
    if (users && profilesByUserId && rolesById && positionsById && departmentsById) {
      return users.map((user) => ({
        ...user,
        profile: profilesByUserId[user.id] || null,
        roles: user.roles.map((id) => rolesById[id]),
        positions: user.positions.map((id) => positionsById[id]),
        departments: user.departments.map((id) => departmentsById[id]),
      }));
    }
  }, [users, profilesByUserId, rolesById, positionsById, departmentsById]);

  return (
    <main className="@container/main flex flex-1 flex-col gap-2">
      {usersWithRelationships ? (
        <DataTable
          className="max-h-[calc(100vh-141px)]"
          data={filterRows(usersWithRelationships, filter)}
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
