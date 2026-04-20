import { FamilyStatus, Sex } from '@/entities/profile';
import { User } from '@/entities/user';
import { ROUTES } from '@/shared/config';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/shared/ui';
import {
  CellContext,
  ColumnDef
} from '@tanstack/react-table';
import dayjs from 'dayjs';
import { generatePath, Link } from 'react-router-dom';
import { type Filter } from '../model/types';
import { Dispatch, memo, SetStateAction, useCallback, useMemo } from 'react';
import { debounce } from '@/shared/lib';
import { RolesFilter } from './roles-filter';
import { PositionsFilter } from './positions-filter';
import { DepartmentsFilter } from './departments-filter';

type Props = {
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
};

const AvatarCell = memo(({ row }: CellContext<User, unknown>) => {
  const user = row.original as User;

  return (
    <Avatar className="size-12">
      <AvatarImage
        src={user.avatarThumb || undefined}
        alt={`${user.surname} ${user.name}`}
      />
      <AvatarFallback>
        {user.surname.charAt(0)}
        {user.name.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
});

const NameCell = memo(({ row }: CellContext<User, unknown>) => {
  const user = row.original as User;

  return (
    <Button variant="link" asChild>
      <Link
        className="max-w-full whitespace-normal! h-auto"
        to={generatePath(ROUTES.USER_READ, { id: user.id })}
      >
        {user.surname} {user.name} {user.patronymic}
      </Link>
    </Button>
  );
});

const RolesCell = memo(({ row }: CellContext<User, unknown>) => {
  const user = row.original as User;

  return (
    <div className="flex flex-wrap gap-1">
      {user.roles.map((role) => (
        <Badge key={role.name}>
          {role.displayName}
        </Badge>
      ))}
    </div>
  );
});

const PositionsCell = memo(({ row }: CellContext<User, unknown>) => {
  const user = row.original as User;

  return (
    <div className="flex flex-wrap gap-1">
      {user.positions.map((position) => (
        <Badge key={position.name} variant="secondary">
          {position.name}
        </Badge>
      ))}
    </div>
  );
});

const DepartmentsCell = memo(({ row }: CellContext<User, unknown>) => {
  const user = row.original as User;

  return (
    <div className="flex flex-wrap gap-1">
      {user.departments.map((department) => (
        <Badge key={department.name} variant="outline">
          {department.name}
        </Badge>
      ))}
    </div>
  );
});

const EmailCell = memo(({ row }: CellContext<User, unknown>) => {
  const user = row.original as User;

  return (
    <Button variant="link" asChild>
      <Link
        className="block max-w-full h-auto whitespace-normal! wrap-anywhere"
        to={`mailto:${user.email}`}
      >
        {user.email}
      </Link>
    </Button>
  );
});

const PhoneCell = memo(({ row }: CellContext<User, unknown>) => {
  const user = row.original as User;

  return (
    <div className="flex flex-col">
      {user.profile?.tel1 && (
        <Button variant="link" asChild>
          <Link className="w-max p-0 h-auto" to={`tel:${user.profile.tel1}`}>
            {user.profile.tel1}
          </Link>
        </Button>
      )}
      {user.profile?.tel2 && (
        <Button variant="link" asChild>
          <Link className="w-max p-0 h-auto" to={`tel:${user.profile.tel2}`}>
            {user.profile.tel2}
          </Link>
        </Button>
      )}
    </div>
  );
});

const useUserColumns = ({ filter, setFilter }: Props) => {
  const setFilterKey = useMemo(
    () =>
      debounce((keyName: keyof Filter, value: string) => {
        setFilter((prev) => ({ ...prev, [keyName]: value }));
      }, 300),
    [setFilter]
  );

  const toggleRoles = useMemo(
    () => (value: string) => {
      let current = filter.roles;
      current = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];

      setFilter((prev) => ({ ...prev, roles: current }));
    },
    [filter.roles, setFilter]
  );

  const renderRolesFilter = useCallback(() => (
    <RolesFilter
      selected={filter.roles}
      toggle={toggleRoles}
    />
  ), [filter.roles, toggleRoles]);

  const togglePositions = useMemo(
    () => (value: string) => {
      let current = filter.positions;
      current = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];

      setFilter((prev) => ({ ...prev, positions: current }));
    },
    [filter.positions, setFilter]
  );

  const renderPositionsFilter = useCallback(() => (
    <PositionsFilter
      selected={filter.positions}
      toggle={togglePositions}
    />
  ), [filter.positions, togglePositions]);

  const toggleDepartments = useMemo(
    () => (value: string) => {
      let current = filter.departments;
      current = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];

      setFilter((prev) => ({ ...prev, departments: current }));
    },
    [filter.departments, setFilter]
  );

  const renderDepartmentsFilter = useCallback(() => (
    <DepartmentsFilter
      selected={filter.departments}
      toggle={toggleDepartments}
    />
  ), [filter.departments, toggleDepartments]);

  const columns = useMemo<ColumnDef<User>[]>(() => [
    {
      id: 'Фото',
      accessorKey: 'user.avatarThumb',
      header: 'Фото',
      size: 83,
      cell: AvatarCell,
    },
    {
      id: 'ФИО',
      accessorKey: 'user.name',
      header: () => <div className="px-3">ФИО</div>,
      size: 220,
      cell: NameCell,
      sortingFn: (a, b) => a.original.surname.localeCompare(b.original.surname),
      enableColumnFilter: filter.name ? true : false,
      meta: {
        renderFilter: () => (
          <Input
            type="search"
            placeholder="Искать по ФИО"
            defaultValue={filter.name}
            onChange={(evt) => setFilterKey('name', evt.target.value)}
          />
        ),
      },
    },
    {
      id: 'Позиция',
      accessorKey: 'user.roles',
      header: 'Позиция',
      size: 220,
      cell: RolesCell,
      enableColumnFilter: filter.roles.length ? true : false,
      meta: {
        renderFilter: renderRolesFilter,
      },
    },
    {
      id: 'Отдел/Департамент',
      accessorKey: 'user.departments',
      header: 'Отдел/Департамент',
      size: 220,
      cell: DepartmentsCell,
      enableColumnFilter: filter.departments.length ? true : false,
      meta: {
        renderFilter: renderDepartmentsFilter,
      },
    },
    {
      id: 'Должность',
      accessorKey: 'user.positions',
      header: 'Должность',
      size: 220,
      cell: PositionsCell,
      enableColumnFilter: filter.positions.length ? true : false,
      meta: {
        renderFilter: renderPositionsFilter,
      },
    },
    {
      id: 'Email',
      accessorKey: 'user.email',
      header: () => <div className="px-3">Email</div>,
      size: 240,
      cell: EmailCell,
      sortingFn: (a, b) => (a.original.email || '').localeCompare(b.original.email || ''),
      enableColumnFilter: filter.email ? true : false,
      meta: {
        renderFilter: () => (
          <Input
            type="search"
            placeholder="Искать по Email"
            defaultValue={filter.email}
            onChange={(evt) => setFilterKey('email', evt.target.value)}
          />
        ),
      },
    },
    {
      id: 'Дата рождения',
      accessorKey: 'user.profile.birthDate',
      header: 'Дата рождения',
      size: 160,
      cell: ({ row }) => row.original.profile?.birthDate ? dayjs(row.original.profile.birthDate).format('DD MMM YYYY') : '',
      sortingFn: (a, b) => (a.original.profile?.birthDate || '').localeCompare(b.original.profile?.birthDate || ''),
    },
    {
      id: 'Пол',
      accessorKey: 'user.profile.sex',
      header: 'Пол',
      size: 100,
      cell: ({ row }) => row.original.profile?.sex ? Sex[row.original.profile.sex] : '',
      sortingFn: (a, b) => (a.original.profile?.sex || '').localeCompare(b.original.profile?.sex || ''),
      enableColumnFilter: filter.sex ? true : false,
      meta: {
        renderFilter: () => (
          <Select
            value={filter.sex}
            onValueChange={(value) => setFilterKey('sex', value.trim())}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Выберите пол" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectGroup>
                <SelectItem value=" ">Не указать</SelectItem>
                {Object.entries(Sex).map(([key, value]) => (
                  <SelectItem key={key} value={key}>{value}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        ),
      },
    },
    {
      id: 'Национальность',
      accessorKey: 'user.profile.nationality',
      header: 'Национальность',
      size: 170,
      cell: ({ row }) => row.original.profile?.nationality,
      sortingFn: (a, b) => (a.original.profile?.nationality || '').localeCompare(b.original.profile?.nationality || ''),
      enableColumnFilter: filter.nationality ? true : false,
      meta: {
        renderFilter: () => (
          <Input
            type="search"
            placeholder="Искать по национальности"
            defaultValue={filter.nationality}
            onChange={(evt) => setFilterKey('nationality', evt.target.value)}
          />
        ),
      },
    },
    {
      id: 'Гражданство',
      accessorKey: 'user.profile.citizenship',
      header: 'Гражданство',
      cell: ({ row }) => row.original.profile?.citizenship,
      sortingFn: (a, b) => (a.original.profile?.citizenship || '').localeCompare(b.original.profile?.citizenship || ''),
      enableColumnFilter: filter.citizenship ? true : false,
      meta: {
        renderFilter: () => (
          <Input
            type="search"
            placeholder="Искать по гражданству"
            defaultValue={filter.citizenship}
            onChange={(evt) => setFilterKey('citizenship', evt.target.value)}
          />
        ),
      },
    },
    {
      id: 'Адрес',
      accessorKey: 'user.profile.address',
      header: 'Адрес',
      size: 260,
      cell: ({ row }) => row.original.profile?.address,
      sortingFn: (a, b) => (a.original.profile?.address || '').localeCompare(b.original.profile?.address || ''),
      enableColumnFilter: filter.address ? true : false,
      meta: {
        renderFilter: () => (
          <Input
            type="search"
            placeholder="Искать по адресу"
            defaultValue={filter.address}
            onChange={(evt) => setFilterKey('address', evt.target.value)}
          />
        ),
      },
    },
    {
      id: 'Телефон',
      accessorKey: 'user.profile.tel',
      header: () => <div className="px-3">Телефон</div>,
      size: 140,
      cell: PhoneCell,
      enableColumnFilter: filter.tel ? true : false,
      meta: {
        renderFilter: () => (
          <Input
            type="search"
            placeholder="Искать по номеру телефона"
            defaultValue={filter.tel}
            onChange={(evt) => setFilterKey('tel', evt.target.value)}
          />
        ),
      },
    },
    {
      id: 'Семейное положение',
      accessorKey: 'user.profile.familyStatus',
      header: 'Семейное положение',
      size: 210,
      sortingFn: (a, b) => (a.original.profile?.familyStatus || '').localeCompare(b.original.profile?.familyStatus || ''),
      cell: ({ row }) => row.original.profile?.familyStatus ? FamilyStatus[row.original.profile.familyStatus] : '',
      enableColumnFilter: filter.familyStatus ? true : false,
      meta: {
        renderFilter: () => (
          <Select
            value={filter.familyStatus}
            onValueChange={(value) => setFilterKey('familyStatus', value.trim())}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Выберите семейное положение" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectGroup>
                <SelectItem value=" ">Не указать</SelectItem>
                {Object.entries(FamilyStatus).map(([key, value]) => (
                  <SelectItem key={key} value={key}>{value}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        ),
      },
    },
    {
      id: 'Дети',
      accessorKey: 'user.profile.children',
      header: 'Дети',
      size: 120,
      sortingFn: (a, b) => (a.original.profile?.children?.length.toString() || '').localeCompare(b.original.profile?.children?.length.toString() || ''),
      cell: ({ row }) => row.original.profile?.children?.join(', '),
    },
    {
      id: 'Начало работы',
      accessorKey: 'user.profile.startedWorkAt',
      header: 'Начало работы',
      size: 160,
      sortingFn: (a, b) => (a.original.profile?.startedWorkAt || '').localeCompare(b.original.profile?.startedWorkAt || ''),
      cell: ({ row }) =>
        row.original.profile?.startedWorkAt ? dayjs(row.original.profile.startedWorkAt).format('DD MMM YYYY') : '',
    },
  ], [filter, setFilterKey, renderRolesFilter, renderPositionsFilter, renderDepartmentsFilter]);

  return { columns };
};

export {
  useUserColumns,
};
