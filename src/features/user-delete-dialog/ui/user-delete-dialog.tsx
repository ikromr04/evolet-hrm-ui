import { JSX, useState } from 'react';
import { useAppDispatch } from '@/shared/store';
import { toast } from 'sonner';
import { ApiErrors } from '@/shared/api';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Spinner,
} from '@/shared/ui';
import { deleteUserAction, User } from '@/entities/user';

type UserDeleteDialogProps = {
  trigger: JSX.Element;
  user: Pick<User, 'id' | 'name' | 'surname'>;
  onSuccess?: () => void;
}

function UserDeleteDialog({
  trigger,
  user,
  onSuccess,
}: UserDeleteDialogProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();

  const handleButtonClick = async () => {
    setIsSubmitting(true);
    await dispatch(deleteUserAction({ id: user.id }))
      .unwrap()
      .then(() => {
        toast.success('Сотрудник успешно удален.');
        setIsOpen(false);
        onSuccess?.();
      })
      .catch((errors: ApiErrors) => errors.forEach((error) => toast.error(error.detail)));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>

      <DialogContent className="max-h-[calc(100vh-2rem)] overflow-auto">
        <div className="flex flex-col gap-6">
          <DialogHeader>
            <DialogTitle className="pr-10 leading-[1.2]">
              Удалить сотрудника
            </DialogTitle>
            <DialogDescription>
              Вы уверены что хотите удалить сотрудника {user.surname} {user.name}?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Отмена
              </Button>
            </DialogClose>
            <Button
              type="button"
              disabled={isSubmitting}
              onClick={handleButtonClick}
            >
              {isSubmitting && <Spinner />}
              Удалить
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { UserDeleteDialog };
