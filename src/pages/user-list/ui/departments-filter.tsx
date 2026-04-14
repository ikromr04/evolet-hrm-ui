import { cn } from '@/shared/lib';
import { useAppSelector } from '@/shared/store';
import { ChevronsUpDown, X } from 'lucide-react';
import { memo } from 'react';
import {
  Badge,
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/shared/ui';
import { getDepartments } from '@/entities/department';

type DepartmentsFilterProps = {
  selected: string[];
  toggle: (id: string) => void;
};

const DepartmentsFilter = memo(({ selected, toggle }: DepartmentsFilterProps) => {
  const departments = useAppSelector(getDepartments);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="pr-2! py-1.25 min-h-8 h-max text-start whitespace-normal w-88"
        >
          <span className={cn(
            'grow flex flex-wrap gap-1',
            !selected.length && 'text-muted-foreground'
          )}>
            {!selected.length
              ? 'Выберите Отдел/Департамент'
              : departments
                ?.filter((department) => selected.includes(department.id))
                .map((department) => (
                  <Badge
                    key={department.id}
                    variant="outline"
                    onClick={(evt) => {
                      toggle(department.id);
                      evt.stopPropagation();
                    }}
                  >
                    {department.name}
                    <X size={8} />
                  </Badge>
                ))}
          </span>

          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-88 p-0">
        <Command>
          <CommandInput placeholder="Поиск..." />
          <CommandList>
            <CommandEmpty>Отдел/Департамент не найдена</CommandEmpty>
            <CommandGroup>
              {departments?.map((department) => (
                <CommandItem
                  key={department.id}
                  data-checked={selected.includes(department.id)}
                  onSelect={() => toggle(department.id)}
                >
                  {department.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
});

export { DepartmentsFilter };
