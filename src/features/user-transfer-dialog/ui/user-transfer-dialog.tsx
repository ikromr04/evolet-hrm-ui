import { BaseSyntheticEvent, JSX, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch } from '@/shared/store';
import { zodResolver } from '@hookform/resolvers/zod';
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
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  Spinner,
} from '@/shared/ui';
import { transferUserAction, User, userTransferSchema, UserTransferSchema } from '@/entities/user';

type UserTransferDialogProps = {
  trigger: JSX.Element;
  user: Pick<User, 'id' | 'name' | 'surname'>;
}

function UserTransferDialog({
  trigger,
  user,
}: UserTransferDialogProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const form = useForm<UserTransferSchema>({
    resolver: zodResolver(userTransferSchema),
    defaultValues: {
      id: user.id,
      to: undefined,
    },
  });

  const onSubmit = async (data: UserTransferSchema, evt?: BaseSyntheticEvent) => {
    evt?.preventDefault();

    await dispatch(transferUserAction({ data }))
      .unwrap()
      .then(() => toast.success('Сотрудник успешно переведен.'))
      .catch((errors: ApiErrors) => {
        errors.forEach((error) => {
          if (error.source?.pointer) {
            form.setError(error.source.pointer.split('/').pop() as keyof UserTransferSchema, {
              message: error.detail
            });
          } else {
            toast.error(error.detail);
          }
        });
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>

      <DialogContent className="max-h-[calc(100vh-2rem)] overflow-auto">
        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
        >
          <DialogHeader>
            <DialogTitle className="pr-10 leading-[1.2]">
              Перевод сотрудника
            </DialogTitle>
            <DialogDescription>
              Вы уверены что хотите перевести сотрудника {user.surname} {user.name}?
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Controller
              name="to"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="to">
                    Укажите куда (необязательно)
                  </FieldLabel>
                  <Input
                    {...field}
                    id="to"
                    type="text"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
              >
                Отмена
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && <Spinner />}
              Перевести
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export { UserTransferDialog };
