import { BaseSyntheticEvent, Dispatch, JSX, SetStateAction } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Field,
  FieldError,
  FieldGroup,
  Input,
  Label,
  Spinner
} from '@/shared/ui';
import { useAppDispatch } from '@/shared/store';
import { storeUserAction, User, userStoreSchema, UserStoreSchema } from '@/entities/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { ApiErrors } from '@/shared/api';
import { Step } from './user-create-dialog';

type UserCreateProps = {
  setStep: Dispatch<SetStateAction<Step>>;
  setUser: Dispatch<SetStateAction<User | undefined>>;
}

function UserCreate({
  setStep,
  setUser,
}: UserCreateProps): JSX.Element {
  const dispatch = useAppDispatch();

  const form = useForm<UserStoreSchema>({
    resolver: zodResolver(userStoreSchema),
  });

  const onSubmit = async (data: UserStoreSchema, evt?: BaseSyntheticEvent) => {
    evt?.preventDefault();

    await dispatch(storeUserAction(data))
      .unwrap()
      .then((user) => {
        toast.success('Сотрудник успешно добавлен.');
        setStep('avatar-upload');
        setUser(user);
      })
      .catch((errors: ApiErrors) => {
        errors.forEach((error) => {
          if (error.source?.pointer) {
            form.setError(error.source.pointer.split('/').pop() as keyof UserStoreSchema, {
              message: error.detail
            });
          } else {
            toast.error(error.detail);
          }
        });
      });
  };

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
    >
      <DialogHeader>
        <DialogTitle>
          Добавить сотрудника
        </DialogTitle>
        <DialogDescription>
          Заполните данные сотрудника
        </DialogDescription>
      </DialogHeader>

      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          defaultValue=""
          render={({ field, fieldState }) => (
            <Field>
              <Label htmlFor="name">
                Имя <span className="text-destructive">*</span>
              </Label>
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
          name="surname"
          control={form.control}
          defaultValue=""
          render={({ field, fieldState }) => (
            <Field>
              <Label htmlFor="surname">
                Фамилия <span className="text-destructive">*</span>
              </Label>
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
          name="patronymic"
          control={form.control}
          defaultValue=""
          render={({ field, fieldState }) => (
            <Field>
              <Label htmlFor="patronymic">
                Отчество
              </Label>
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
              <Label htmlFor="email">
                Email <span className="text-destructive">*</span>
              </Label>
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
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && <Spinner />}
          Добавить
        </Button>
      </DialogFooter>
    </form>
  );
}

export default UserCreate;
