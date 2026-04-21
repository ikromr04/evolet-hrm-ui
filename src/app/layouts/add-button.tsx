import { JSX } from 'react';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/shared/ui';
import { Plus } from 'lucide-react';
import { UserCreateDialog } from '@/features/user-create-dialog';

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
        <UserCreateDialog trigger={
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
