import { JSX, BaseSyntheticEvent, Dispatch, ReactNode, SetStateAction, useState, useMemo } from 'react';
import {
  Column,
  ColumnDef,
  ColumnPinningState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  Header,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { cn, debounce } from '../lib';
import { AArrowDown, AArrowUp, ChevronDown, Columns2, EyeOff, Funnel, FunnelPlus, FunnelX, Pin, PinOff } from 'lucide-react';
import { Button } from './button';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Command, CommandGroup, CommandItem, CommandList } from './command';
import { Input } from './input';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue> {
    renderFilter?: (column: Column<TData, TValue>) => JSX.Element;
    columnClass?: string;
    thClass?: string;
  }
};

const DEFAULT_SORTING_STATE: SortingState = [];
const DEFAULT_VISIBILITY_STATE: VisibilityState = {};
const DEFAULT_COLUMN_PINNING_STATE: ColumnPinningState = {
  left: [],
  right: [],
};

type ColumnFilterProps<TData, TValue> = {
  header: Header<TData, TValue>;
  columnPinning: ColumnPinningState;
  setColumnPinning: Dispatch<SetStateAction<ColumnPinningState>>;
  setColumnVisibility: Dispatch<SetStateAction<VisibilityState>>;
};

const ColumnFilter = <TData, TValue>({
  header,
  columnPinning,
  setColumnPinning,
  setColumnVisibility,
}: ColumnFilterProps<TData, TValue>): JSX.Element => {
  const isActive = columnPinning.left?.includes(header.column.id) || columnPinning.right?.includes(header.column.id) || header.column.columnDef.enableColumnFilter;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className={cn(
            'hover:bg-muted-foreground/30! rounded-full active:opacity-100 bg-muted',
            isActive
              ? 'opacity-100 text-error'
              : 'md:opacity-0 group-hover:opacity-100'
          )}
        >
          {isActive ? (
            <FunnelPlus size={14} />
          ) : (
            <Funnel size={14} />
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-max"
        align="start"
        sideOffset={10}
      >
        <h3 className="text-sm leading-none text-gray-400 mb-1">
          {flexRender(header.column.columnDef.header, header.getContext())}
        </h3>

        {header.column.columnDef.meta?.renderFilter?.(header.column)}

        {!columnPinning.left?.includes(header.column.id) && (
          <Button
            className="justify-start"
            variant="outline"
            type="button"
            onClick={() =>
              setColumnPinning((prev) => ({
                left: prev.left && (prev.left.includes(header.column.id) ? [...prev.left] : [...prev.left, header.column.id]),
                right: prev.right?.filter((col) => col !== header.column.id),
              }))
            }
          >
            <span className="flex items-center justify-center w-4 h-4">
              <Pin className="transform rotate-30" size={16} />
            </span>
            Закрепить слева
          </Button>
        )}
        {!columnPinning.right?.includes(header.column.id) && (
          <Button
            className="justify-start"
            variant="outline"
            type="button"
            onClick={() =>
              setColumnPinning((prev) => ({
                left: prev.left?.filter((col) => col !== header.column.id),
                right: prev.right && (prev.right.includes(header.column.id) ? [...prev.right] : [...prev.right, header.column.id]),
              }))
            }
          >
            <span className="flex items-center justify-center w-4 h-4">
              <Pin className="transform -rotate-30" size={16} />
            </span>
            Закрепить справа
          </Button>
        )}
        {(columnPinning.right?.includes(header.column.id) || columnPinning.left?.includes(header.column.id)) && (
          <Button
            className="justify-start"
            variant="outline"
            type="button"
            onClick={() =>
              setColumnPinning((prev) => ({
                left: prev.left?.filter((col) => col !== header.column.id),
                right: prev.right?.filter((col) => col !== header.column.id),
              }))
            }
          >
            <span className="flex items-center justify-center w-4 h-4">
              <PinOff size={16} />
            </span>
            Открепить
          </Button>
        )}

        <Button
          className="justify-start"
          type="button"
          variant="outline"
          onClick={() => setColumnVisibility((prev) => ({
            ...prev,
            [header.column.id]: false,
          }))}
        >
          <span className="flex items-center justify-center w-4 h-4">
            <EyeOff size={16} />
          </span>
          Скрыть столбец
        </Button>
      </PopoverContent>
    </Popover>
  );
};

type DataTableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  sortingState?: SortingState;
  visibilityState?: VisibilityState;
  columnPinningState?: ColumnPinningState;
  actions?: ReactNode;
  onExport?: (data: T[], columnVisibility: VisibilityState) => void;
  searchValue: string;
  onSearch: (value: string) => void;
  className?: string;
  filterResetable?: boolean;
  onFilterReset?: () => void;
};

function DataTable<T>({
  data,
  columns,
  sortingState = DEFAULT_SORTING_STATE,
  visibilityState = DEFAULT_VISIBILITY_STATE,
  columnPinningState = DEFAULT_COLUMN_PINNING_STATE,
  searchValue,
  onSearch,
  className,
  filterResetable,
  onFilterReset,
}: DataTableProps<T>): JSX.Element {
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [sorting, setSorting] = useState<SortingState>(sortingState);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(visibilityState);
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>(columnPinningState);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    defaultColumn: {
      maxSize: Number.MAX_SAFE_INTEGER,
      sortDescFirst: false,
      enableSorting: true,
      enableColumnFilter: false,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter,
      columnVisibility,
      columnPinning,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnPinningChange: setColumnPinning,
  });

  const columnSizes = table.getHeaderGroups()[0].headers.map((header) => ({
    id: header.column.id,
    size: header.getSize()
  }));

  const getColumnPinningLeft = (columnId: string): object => {
    if (columnPinning.left) {
      const columnIndex = columnPinning.left.findIndex((id) => id === columnId);
      if (columnIndex && columnIndex < 0) return {};

      const left = columnPinning.left.reduce((acc, id, index) => {
        if (index < columnIndex) {
          acc += columnSizes.find((column) => column.id === id)?.size || 0;
        }

        return acc;
      }, 0);

      return {
        left: `${left}px`,
      };
    }

    return {};
  };

  const getColumnPinningRight = (columnId: string): object => {
    if (columnPinning.right) {
      const columnIndex = columnPinning.right.findIndex((id) => id === columnId);
      if (columnIndex && columnIndex < 0) return {};

      const right = columnPinning.right.reduce((acc, id, index) => {
        if (index < columnIndex) {
          acc += columnSizes.find((column) => column.id === id)?.size || 0;
        }

        return acc;
      }, 0);

      return {
        right: `${right}px`,
      };
    }

    return {};
  };

  const handleSearch = useMemo(
    () =>
      debounce((value: string) => {
        onSearch(value);
      }, 300),
    [onSearch]
  );

  return (
    <>
      <div className="flex gap-2">
        <Input
          className="h-7"
          type="search"
          defaultValue={searchValue}
          onInput={(evt: BaseSyntheticEvent) => handleSearch(evt.target.value)}
          placeholder="Поиск по всем атрибутам..."
        />

        {(JSON.stringify(columnVisibility) !== JSON.stringify(visibilityState) || filterResetable) && (
          <Button
            type="button"
            size="sm"
            variant="destructive"
            onClick={() => {
              table.resetColumnVisibility();
              if (onFilterReset) onFilterReset();
            }}
          >
            <FunnelX size={16} /> Сбросить фильтры
          </Button>
        )}

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              <Columns2 size={16} />
              <span className="hidden lg:inline">Настроить столбцы</span>
              <span className="lg:hidden">Столбцы</span>
              <ChevronDown size={16} />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="p-0 w-full"
            onWheel={(evt) => evt.stopPropagation()}
            align="end"
          >
            <Command>
              <CommandList>
                <CommandGroup>
                  <CommandItem
                    data-checked={JSON.stringify(columnVisibility) === JSON.stringify(visibilityState)}
                    onSelect={() => table.resetColumnVisibility()}
                  >
                    Показать все
                  </CommandItem>
                  {table
                    .getAllColumns()
                    .map((column) => {
                      return (
                        <CommandItem
                          key={column.id}
                          data-checked={column.getIsVisible()}
                          onSelect={() => column.toggleVisibility(!column.getIsVisible())}
                        >
                          {column.id}
                        </CommandItem>
                      );
                    })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div className={cn('flex flex-col overflow-scroll scrollbar text-sm rounded-md border', className)}>
        <div className="sticky top-0 z-20 min-w-max bg-muted">
          {table.getHeaderGroups().map((headerGroup) => (
            <div
              key={headerGroup.id}
              className="border-b transition-colors hover:bg-muted/50 flex font-semibold min-h-7"
            >
              <div className="h-10 px-2 w-10 text-left font-medium whitespace-nowrap text-foreground flex items-center hover:bg-muted/50">
                №
              </div>
              {headerGroup.headers.map((header) => (
                <div
                  key={header.id}
                  className={cn(
                    'h-10 px-2 text-left font-medium whitespace-nowrap text-foreground flex items-center group bg-muted',
                    columnPinning.left?.includes(header.column.id) && 'sticky z-20 border-r',
                    columnPinning.right?.includes(header.column.id) && 'sticky z-20 border-l',
                    header.column.columnDef.meta?.columnClass,
                  )}
                  onClick={() => (header.column.columnDef.sortingFn !== 'auto') && header.column.toggleSorting()}
                  style={{
                    minWidth: `${header.getSize()}px`,
                    width: `${header.getSize()}px`,
                    maxWidth: `${header.getSize()}px`,
                    ...getColumnPinningLeft(header.column.id),
                    ...getColumnPinningRight(header.column.id),
                  }}
                >
                  <span className="text-start truncate select-none">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </span>
                  {(header.column.columnDef.sortingFn !== 'auto') && (
                    <span
                      className={cn(
                        'flex justify-center items-center min-w-6 min-h-6 rounded-full hover:bg-black/5',
                        !header.column.getIsSorted() && 'hidden opacity-40 group-hover:flex'
                      )}
                    >
                      {(header.column.getIsSorted() === 'desc') ? <AArrowDown size={16} /> : <AArrowUp size={16} />}
                    </span>)}

                  <div className="ml-auto" onClick={(evt) => evt.stopPropagation()}>
                    <ColumnFilter
                      header={header}
                      columnPinning={columnPinning}
                      setColumnPinning={setColumnPinning}
                      setColumnVisibility={setColumnVisibility}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="min-w-max">
          {table.getRowModel().rows.map((row, index) => (
            <div
              key={JSON.stringify(row.original)}
              className="flex border-b group"
            >
              <div className="flex items-center p-2 w-10 group-hover:bg-muted/50 transition-colors">
                {index + 1}
              </div>

              {row.getVisibleCells().map((cell) => (
                <div
                  key={JSON.stringify(cell)}
                  className={cn(
                    'flex',
                    columnPinning.left?.includes(cell.column.id) && 'sticky left-0 z-10 border-r bg-background',
                    columnPinning.right?.includes(cell.column.id) && 'sticky right-0 z-10 border-l bg-background',
                    cell.column.columnDef.meta?.columnClass,
                  )}
                  style={{
                    minWidth: `${cell.column.getSize()}px`,
                    width: `${cell.column.getSize()}px`,
                    maxWidth: `${cell.column.getSize()}px`,
                    ...getColumnPinningLeft(cell.column.id),
                    ...getColumnPinningRight(cell.column.id),
                  }}
                >
                  <div className="flex items-center p-1 md:p-2 group-hover:bg-muted/50 transition-colors w-full">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="sticky bottom-0 z-10 left-0 p-2 border-t bg-muted">
          <div className="flex w-max mr-auto">
            Отображение 1 - {data.length} из {data.length}
          </div>
        </div>
      </div>
    </>
  );
}

export { DataTable };
