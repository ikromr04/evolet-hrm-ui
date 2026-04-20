import { updateUserAction, User, userUpdateSchema, UserUpdateSchema } from '@/entities/user';
import { ApiErrors } from '@/shared/api';
import { useAppDispatch } from '@/shared/store';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { BaseSyntheticEvent, JSX, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

type UserUpdateDialogProps = {
  trigger: JSX.Element;
  user: User;
};

function UserUpdateDialog({
  trigger,
  user,
}: UserUpdateDialogProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const form = useForm<UserUpdateSchema>({
    mode: 'onChange',
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      id: user.id,
      surname: user.surname,
      name: user.name,
      patronymic: user.patronymic || undefined,
      email: user.email,
    }
  });

  const onSubmit = async (values: UserUpdateSchema, evt?: BaseSyntheticEvent) => {
    evt?.preventDefault();

    const dirtyFields = Object.keys(form.formState.dirtyFields).reduce((acc, key) => {
      acc[key as keyof UserUpdateSchema] = values[key as keyof UserUpdateSchema];
      return acc;
    }, { id: user.id } as UserUpdateSchema);

    await dispatch(updateUserAction({ payload: dirtyFields }))
      .unwrap()
      .then(() => {
        toast.success('Данные успешно обновлены.');
        form.reset(values);
        setOpen(false);
      })
      .catch((errors: ApiErrors) => {
        errors.forEach((error) => {
          if (error.source?.pointer) {
            form.setError(error.source.pointer.split('/').pop() as keyof UserUpdateSchema, {
              message: error.detail
            });
          } else {
            toast.error(error.detail);
          }
        });
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>

      <DialogContent className="max-h-[calc(100vh-2rem)] overflow-auto">
        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(onSubmit)}
          id="user-update-form"
          noValidate
        >
          <DialogHeader>
            <DialogTitle>
              Редактирование сотрудника
            </DialogTitle>
            <DialogDescription>
              Измените данные сотрудника и сохраните изменения.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Controller
              name="surname"
              control={form.control}
              defaultValue={user.surname}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="surname">
                    Фамилия <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="surname"
                    type="text"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    required
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
            <Controller
              name="name"
              control={form.control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="name">
                    Имя <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    type="text"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    required
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
            <Controller
              name="patronymic"
              control={form.control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="patronymic">
                    Отчество
                  </FieldLabel>
                  <Input
                    {...field}
                    id="patronymic"
                    type="text"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="email">
                    Email <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    required
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Отмена
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting || !form.formState.isDirty}
              form="user-update-form"
            >
              {form.formState.isSubmitting && <Spinner />}
              Сохранить
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export { UserUpdateDialog };
