import { avatarUploadSchema, AvatarUploadSchema, uploadUserAvatarAction, User } from '@/entities/user';
import { useAppDispatch } from '@/shared/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { BaseSyntheticEvent, Dispatch, ReactNode, SetStateAction } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Step } from './user-create-dialog';
import { MoveRight } from 'lucide-react';
import { toast } from 'sonner';
import { ApiErrors } from '@/shared/api';
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
  Spinner
} from '@/shared/ui';

type AvatarUploadProps = {
  user: User;
  setStep: Dispatch<SetStateAction<Step>>;
};

function AvatarUpload({
  user,
  setStep,
}: AvatarUploadProps): ReactNode {
  const dispatch = useAppDispatch();

  const form = useForm<AvatarUploadSchema>({
    resolver: zodResolver(avatarUploadSchema),
  });

  const onSubmit = async (data: AvatarUploadSchema, evt?: BaseSyntheticEvent) => {
    evt?.preventDefault();

    await dispatch(uploadUserAvatarAction({
      id: user.id,
      payload: data,
    }))
      .unwrap()
      .then(() => {
        toast.success('Изображение обновлено.');
        setStep('success');
      })
      .catch((errors: ApiErrors) => {
        errors.forEach((error) => {
          if (error.source?.pointer) {
            form.setError(error.source.pointer.split('/').pop() as keyof AvatarUploadSchema, {
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
      encType="multipart/form-data"
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
    >
      <DialogHeader>
        <DialogTitle>
          Фото профиля
        </DialogTitle>
        <DialogDescription>
          Загрузите фотографию профиля сотрудника {user.name} {user.surname}.
        </DialogDescription>
      </DialogHeader>

      <FieldGroup>
        <Controller
          name="image"
          control={form.control}
          defaultValue={null}
          render={({ field, fieldState }) => (
            <Field className="grid grid-cols-[96px_1fr] items-end gap-x-6 gap-y-4">
              <Avatar className="size-24 max-w-24">
                <AvatarImage src={field.value && URL.createObjectURL(field.value)} />
                <AvatarFallback>
                  {user.name[0]}
                  {user.surname[0]}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col gap-2">
                <span className="col-span-2 text-muted-foreground">
                  {field.value?.name}
                </span>
                <Button variant="secondary" asChild>
                  <label className="border border-border!">
                    <input
                      type="file"
                      accept=".jpg, .jpeg, .png, .webp"
                      className="hidden"
                      onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                    />
                    {field.value ? 'Выбрать другой файл' : 'Выбрать файл'}
                  </label>
                </Button>

                <FieldError errors={[fieldState.error]} />
              </div>
            </Field>
          )}
        />
      </FieldGroup>

      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={() => setStep('success')}
        >
          Пропустить
          <MoveRight className="mt-0.5" size={16} />
        </Button>
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && <Spinner />}
          Сохранить
        </Button>
      </DialogFooter>
    </form>
  );
}

export { AvatarUpload };
