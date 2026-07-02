import { fetchUsersAction, getUsers, getUsersStatus, User } from '@/entities/user';
import { AsyncStatus, useAppDispatch, useAppSelector } from '@/shared/store';
import { JSX, useEffect, useMemo, useState } from 'react';
import { Button, DataTable, TableSkeleton } from '@/shared/ui';
import { UserFilter, UserRow } from '../model/types';
import { useUserColumns } from './columns';
import { filterRows } from '../lib/filter-rows';
import { defaultFilter } from '../model/filter';
import { fetchProfilesAction, getProfiles, getProfilesStatus, Profile } from '@/entities/profile';
import { fetchRolesAction, getRoles, getRolesStatus, Role } from '@/entities/role';
import { fetchPositionsAction, getPositions, getPositionsStatus, Position } from '@/entities/position';
import { Department, fetchDepartmentsAction, getDepartments, getDepartmentsStatus } from '@/entities/department';
import { UserCreateDialog } from '@/features/user-create-dialog';

function UsersTable(): JSX.Element {
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

  const [filter, setFilter] = useState<UserFilter>(defaultFilter);
  const { columns } = useUserColumns({ filter, setFilter });

  useEffect(() => {
    if (usersStatus === AsyncStatus.IDLE) dispatch(fetchUsersAction());
    if (profilesStatus === AsyncStatus.IDLE) dispatch(fetchProfilesAction());
    if (rolesStatus === AsyncStatus.IDLE) dispatch(fetchRolesAction());
    if (positionsStatus === AsyncStatus.IDLE) dispatch(fetchPositionsAction());
    if (departmentsStatus === AsyncStatus.IDLE) dispatch(fetchDepartmentsAction());
  }, [departmentsStatus, dispatch, positionsStatus, profilesStatus, rolesStatus, usersStatus]);

  const rows: UserRow[] | undefined = useMemo(() => {
    if (users && profiles && roles && positions && departments) {
      const profilesByUserId = profiles.reduce((acc: Record<string, Profile>, profile: Profile) => {
        acc[profile.userId] = profile;
        return acc;
      }, {});

      const rolesById = roles.reduce((acc: Record<string, Role>, role: Role) => {
        acc[role.id] = role;
        return acc;
      }, {});

      const positionsById = positions.reduce((acc: Record<string, Position>, position: Position) => {
        acc[position.id] = position;
        return acc;
      }, {});

      const departmentsById = departments.reduce((acc: Record<string, Department>, department: Department) => {
        acc[department.id] = department;
        return acc;
      }, {});

      return users.map((user: User) => ({
        ...user,
        profile: profilesByUserId[user.id],
        roles: user.roles.map((id) => rolesById[id]),
        positions: user.positions.map((id) => positionsById[id]),
        departments: user.departments.map((id) => departmentsById[id]),
      }));
    }
  }, [departments, positions, profiles, roles, users]);

  if (!rows) return <TableSkeleton />;

  return (
    <DataTable
      className="max-h-[calc(100vh-101px)] md:max-h-[calc(100vh-125px)]"
      data={filterRows(rows, filter)}
      columns={columns}
      searchValue={filter.keyword}
      onSearch={(value) => setFilter((prev) => ({ ...prev, keyword: value }))}
      filterResetable={JSON.stringify(filter) !== JSON.stringify(defaultFilter)}
      onFilterReset={() => setFilter(defaultFilter)}
      actions={<UserCreateDialog trigger={
        <Button size="sm">
          Добавить
        </Button>
      } />}
    />
  );
}

export { UsersTable };
