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
import { getPositions } from '@/entities/position';

type PositionsFilterProps = {
  selected: string[];
  toggle: (id: string) => void;
};

const PositionsFilter = memo(({ selected, toggle }: PositionsFilterProps) => {
  const positions = useAppSelector(getPositions);

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
              ? 'Выберите должность'
              : positions
                ?.filter((position) => selected.includes(position.id))
                .map((position) => (
                  <Badge
                    key={position.id}
                    variant="outline"
                    onClick={(evt) => {
                      toggle(position.id);
                      evt.stopPropagation();
                    }}
                  >
                    {position.name}
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
            <CommandEmpty>Должность не найдена</CommandEmpty>
            <CommandGroup>
              {positions?.map((position) => (
                <CommandItem
                  key={position.id}
                  data-checked={selected.includes(position.id)}
                  onSelect={() => toggle(position.id)}
                >
                  {position.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
});

export { PositionsFilter };
