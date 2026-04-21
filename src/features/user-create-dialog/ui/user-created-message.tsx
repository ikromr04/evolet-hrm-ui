import { Button, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/shared/ui';
import { Dispatch, JSX, SetStateAction } from 'react';
import { Step } from './user-create-dialog';
import { generatePath, Link } from 'react-router-dom';
import { ROUTES } from '@/shared/config';
import { User } from '@/entities/user';

type UserCreatedMessageProps = {
  user: User;
  setStep: Dispatch<SetStateAction<Step>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

function UserCreatedMessage({
  user,
  setStep,
  setIsOpen,
}: UserCreatedMessageProps): JSX.Element {
  return (
    <div className="flex flex-col gap-6">
      <DialogHeader>
        <DialogTitle>
          Готово
        </DialogTitle>
        <DialogDescription>
          Сотрудник успешно добавлен.
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <Button type="button" variant="outline" asChild>
          <Link
            to={generatePath(ROUTES.USER_READ, { id: user.id })}
            onClick={() => setIsOpen(false)}
          >
            Профиль сотрудника
          </Link>
        </Button>
        <Button type="button" onClick={() => setStep('user-create')}>
          Добавить ещё
        </Button>
      </DialogFooter>
    </div>
  );
}

export { UserCreatedMessage };
