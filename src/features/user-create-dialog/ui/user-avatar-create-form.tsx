import { BaseSyntheticEvent, Dispatch, JSX, SetStateAction, } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Spinner
} from '@/shared/ui';
import { useAppDispatch } from '@/shared/store';
import { updateAvatarAction, User, userUpdateSchema, UserUpdateSchema } from '@/entities/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { ApiErrors } from '@/shared/api';
import { Step } from './user-create-dialog';
import { ArrowRight } from 'lucide-react';

type UserAvatarCreateFormProps = {
  setStep: Dispatch<SetStateAction<Step>>;
  user: User;
}

function UserAvatarCreateForm({
  setStep,
  user,
}: UserAvatarCreateFormProps): JSX.Element {
  const dispatch = useAppDispatch();

  const form = useForm<UserUpdateSchema>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      id: user.id,
    }
  });

  const onSubmit = async (data: UserUpdateSchema, evt?: BaseSyntheticEvent) => {
    evt?.preventDefault();

    await dispatch(updateAvatarAction({ data }))
      .unwrap()
      .then(() => {
        toast.success('Фото профиля обновлен.');
        setStep('user-profile');
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
    <form
      className="flex flex-col gap-6"
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
    >
      <DialogHeader>
        <DialogTitle>
          Фото профиля ({user.surname} {user.name})
        </DialogTitle>
        <DialogDescription>
          Добавьте фото профиля сотрудника, чтобы его было легче узнать. Можно загрузить JPG, PNG или WEBP до 2 МБ.
        </DialogDescription>
      </DialogHeader>

      <FieldGroup>
        <Controller
          name="avatar"
          control={form.control}
          defaultValue={null}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel asChild>
                <span>
                  Фото профиля
                </span>
              </FieldLabel>

              <div className="flex gap-x-4 items-end">
                {field.value && (
                  <Avatar className="size-24 max-w-24">
                    <AvatarImage src={field.value && URL.createObjectURL(field.value)} />
                    <AvatarFallback>
                      {user.surname.charAt(0)}
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                )}

                <div className="flex flex-col gap-2 grow">
                  {field.value && (
                    <span className="col-span-2 text-muted-foreground">
                      {field.value.name}
                    </span>
                  )}
                  <Button variant="outline" asChild>
                    <label>
                      <input
                        type="file"
                        accept=".jpg, .jpeg, .png, .webp"
                        className="hidden"
                        onChange={(e) => field.onChange(e.target.files?.[0] || undefined)}
                      />
                      {field.value ? 'Выбрать другой файл' : 'Выбрать файл'}
                    </label>
                  </Button>

                  <FieldError errors={[fieldState.error]} />

                  {field.value && (
                    <Button variant="secondary" onClick={() => field.onChange(undefined)}>
                      Удалить
                    </Button>
                  )}
                </div>
              </div>
            </Field>
          )}
        />
      </FieldGroup>

      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={() => setStep('user-profile')}
        >
          Пропустить
          <ArrowRight size={16} />
        </Button>
        <Button
          type="submit"
          disabled={
            form.formState.isSubmitting ||
            !form.formState.dirtyFields.avatar
          }
        >
          {form.formState.isSubmitting && <Spinner />}
          Сохранить
        </Button>
      </DialogFooter>
    </form>
  );
}

export { UserAvatarCreateForm };
