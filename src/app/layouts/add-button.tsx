import { JSX } from 'react';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/shared/ui';
import { Plus } from 'lucide-react';
import { EmployeeCreateDialog } from '@/features/employee-create-dialog';

function AddButton(): JSX.Element {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button">
          <Plus size={16} />
          Новый
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-max" align="end">
        <EmployeeCreateDialog trigger={
          <DropdownMenuItem onSelect={(evt) => evt.preventDefault()}>
            Сотрудник
          </DropdownMenuItem>
        } />

        <DropdownMenuItem>
          Отдел/Департамент
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { AddButton };
