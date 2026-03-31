import { JSX } from 'react';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/shared/ui';
import { Plus } from 'lucide-react';

function AddButton(): JSX.Element {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button>
          <Plus size={16} />
          Новый
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-max" align="end">
        <DropdownMenuItem>
          Сотрудник
        </DropdownMenuItem>
        <DropdownMenuItem>
          Отдел/Департамент
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { AddButton };
