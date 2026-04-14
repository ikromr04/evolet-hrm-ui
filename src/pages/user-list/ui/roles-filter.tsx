import { getRoles } from '@/entities/role';
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

type RolesFilterProps = {
  selected: string[];
  toggle: (id: string) => void;
};

const RolesFilter = memo(({ selected, toggle }: RolesFilterProps) => {
  const roles = useAppSelector(getRoles);

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
              ? 'Выберите позицию'
              : roles
                ?.filter((role) => selected.includes(role.id))
                .map((role) => (
                  <Badge
                    key={role.id}
                    variant="outline"
                    onClick={(evt) => {
                      toggle(role.id);
                      evt.stopPropagation();
                    }}
                  >
                    {role.displayName}
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
            <CommandEmpty>Позиция не найдена</CommandEmpty>
            <CommandGroup>
              {roles?.map((role) => (
                <CommandItem
                  key={role.id}
                  data-checked={selected.includes(role.id)}
                  onSelect={() => toggle(role.id)}
                >
                  {role.displayName}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
});

export { RolesFilter };
