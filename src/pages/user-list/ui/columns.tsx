import { FamilyStatus, Sex } from '@/entities/profile';
import { ROUTES } from '@/shared/config';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
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
import { Row, type Filter } from '../model/types';
import { Dispatch, memo, SetStateAction, useCallback, useMemo } from 'react';
import { debounce } from '@/shared/lib';
import { RolesFilter } from './roles-filter';
import { PositionsFilter } from './positions-filter';
import { DepartmentsFilter } from './departments-filter';
import { IconDotsVertical } from '@tabler/icons-react';
import { UserFireDialog } from '@/features/user-fire-dialog';
import { UserTransferDialog } from '@/features/user-transfer-dialog';

type Props = {
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
};

const AvatarCell = memo(({ row }: CellContext<Row, unknown>) => (
  <Avatar className="size-12">
    <AvatarImage
      src={row.original.avatarThumb || undefined}
      alt={`${row.original.surname} ${row.original.name}`}
    />
    <AvatarFallback>
      {row.original.surname.charAt(0)}
      {row.original.name.charAt(0)}
    </AvatarFallback>
  </Avatar>
));

const NameCell = memo(({ row }: CellContext<Row, unknown>) => (
  <Button variant="link" asChild>
    <Link
      className="max-w-full whitespace-normal! h-auto"
      to={generatePath(ROUTES.USER_READ, { id: row.original.id })}
    >
      {row.original.surname} {row.original.name} {row.original.patronymic}
    </Link>
  </Button>
));

const RolesCell = memo(({ row }: CellContext<Row, unknown>) => (
  <div className="flex flex-wrap gap-1">
    {row.original.roles.map((role) => (
      <Badge key={role.name}>
        {role.displayName}
      </Badge>
    ))}
  </div>
));

const PositionsCell = memo(({ row }: CellContext<Row, unknown>) => (
  <div className="flex flex-wrap gap-1">
    {row.original.positions.map((position) => (
      <Badge key={position.name} variant="secondary">
        {position.name}
      </Badge>
    ))}
  </div>
));

const DepartmentsCell = memo(({ row }: CellContext<Row, unknown>) => (
  <div className="flex flex-wrap gap-1">
    {row.original.departments.map((department) => (
      <Badge key={department.name} variant="outline">
        {department.name}
      </Badge>
    ))}
  </div>
));

const EmailCell = memo(({ row }: CellContext<Row, unknown>) => (
  <Button variant="link" asChild>
    <Link
      className="block max-w-full h-auto whitespace-normal! wrap-anywhere"
      to={`mailto:${row.original.email}`}
    >
      {row.original.email}
    </Link>
  </Button>
));

const PhoneCell = memo(({ row }: CellContext<Row, unknown>) => (
  <div className="flex flex-col">
    {row.original.profile?.tel1 && (
      <Button variant="link" asChild>
        <Link className="w-max p-0 h-auto" to={`tel:${row.original.profile.tel1}`}>
          {row.original.profile.tel1}
        </Link>
      </Button>
    )}
    {row.original.profile?.tel2 && (
      <Button variant="link" asChild>
        <Link className="w-max p-0 h-auto" to={`tel:${row.original.profile.tel2}`}>
          {row.original.profile.tel2}
        </Link>
      </Button>
    )}
  </div>
));

const ActionsCell = memo(({ row }: CellContext<Row, unknown>) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="ghost"
        className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
        size="icon"
      >
        <IconDotsVertical size={16} />
        <span className="sr-only">Открыть меню</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="min-w-max" align="end">
      <DropdownMenuItem>
        <Link to={generatePath(ROUTES.USER_READ, { id: row.original.id })}>
          Перейти к профилю
        </Link>
      </DropdownMenuItem>
      <UserFireDialog
        user={row.original}
        trigger={
          <DropdownMenuItem onSelect={(evt) => evt.preventDefault()}>
            Уволить
          </DropdownMenuItem>
        }
      />
      <UserTransferDialog
        user={row.original}
        trigger={
          <DropdownMenuItem onSelect={(evt) => evt.preventDefault()}>
            Перевести
          </DropdownMenuItem>
        }
      />
      <DropdownMenuSeparator />
      <DropdownMenuItem variant="destructive">Удалить</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
));

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

  const columns = useMemo<ColumnDef<Row>[]>(() => [
    {
      id: 'Фото',
      accessorKey: 'user.avatarThumb',
      header: 'Фото',
      size: 83,
      cell: AvatarCell,
    },
    {
      id: 'ФИО',
      accessorKey: 'ФИО',
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
      accessorKey: 'Позиция',
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
      accessorKey: 'Отдел/Департамент',
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
      accessorKey: 'Должность',
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
      accessorKey: 'Email',
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
      accessorKey: 'Дата рождения',
      header: 'Дата рождения',
      size: 160,
      cell: ({ row }) => row.original.profile?.birthDate ? dayjs(row.original.profile.birthDate).format('DD MMM YYYY') : '',
      sortingFn: (a, b) => (a.original.profile?.birthDate || '').localeCompare(b.original.profile?.birthDate || ''),
    },
    {
      id: 'Пол',
      accessorKey: 'Пол',
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
      accessorKey: 'Национальность',
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
      accessorKey: 'Гражданство',
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
      accessorKey: 'Адрес',
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
      accessorKey: 'Телефон',
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
      accessorKey: 'Семейное положение',
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
      accessorKey: 'Дети',
      header: 'Дети',
      size: 120,
      sortingFn: (a, b) => {
        const aLen = a.original.profile?.children ? (
          a.original.profile.children.length ?? 0
        ) : -1;
        const bLen = b.original.profile?.children ? (
          b.original.profile?.children?.length ?? 0
        ) : -1;

        return aLen - bLen;
      },
      cell: ({ row }) => row.original.profile?.children ? (
        row.original.profile.children.length ? row.original.profile.children.join(', ') : 'Нет детей'
      ) : '',
    },
    {
      id: 'Начало работы',
      accessorKey: 'Начало работы',
      header: 'Начало работы',
      size: 160,
      sortingFn: (a, b) => (a.original.profile?.startedWorkAt || '').localeCompare(b.original.profile?.startedWorkAt || ''),
      cell: ({ row }) =>
        row.original.profile?.startedWorkAt ? dayjs(row.original.profile.startedWorkAt).format('DD MMM YYYY') : '',
    },
    {
      id: 'actions',
      size: 48,
      enableColumnFilter: false,
      cell: ActionsCell,
    },
  ], [filter, setFilterKey, renderRolesFilter, renderPositionsFilter, renderDepartmentsFilter]);

  return { columns };
};

export {
  useUserColumns,
};
