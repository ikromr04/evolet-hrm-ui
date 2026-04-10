import { BaseSyntheticEvent, JSX, useState } from 'react';
import {
  Button,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
} from '@/shared/ui';
import { User } from '@/entities/user';
import { useAppDispatch } from '@/shared/store';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { equipmentStoreSchema, EquipmentStoreSchema, storeEquipmentAction } from '@/entities/equipment';
import { toast } from 'sonner';
import { ApiErrors } from '@/shared/api';

type EquipmentCreateFormProps = {
  onRemove?: () => void;
  removable?: boolean;
  onSave: () => void;
  user: User;
}

function EquipmentCreateForm({
  onRemove,
  removable,
  onSave,
  user,
}: EquipmentCreateFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [isSaved, setIsSaved] = useState(false);

  const form = useForm<EquipmentStoreSchema>({
    resolver: zodResolver(equipmentStoreSchema),
    defaultValues: {
      userId: user.id,
    },
  });

  const onSubmit = async (data: EquipmentStoreSchema, evt?: BaseSyntheticEvent) => {
    evt?.preventDefault();

    await dispatch(storeEquipmentAction({ payload: data }))
      .unwrap()
      .then(() => {
        toast.success('Данные успешно сохранены.');
        setIsSaved(true);
        onSave();
      })
      .catch((errors: ApiErrors) => {
        errors.forEach((error) => {
          if (error.source?.pointer) {
            form.setError(error.source.pointer.split('/').pop() as keyof EquipmentStoreSchema, {
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
      className="flex flex-col gap-3"
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
    >
      <FieldGroup className="gap-3">
        <Controller
          name="name"
          control={form.control}
          defaultValue=""
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="name">
                Название
              </FieldLabel>
              <Input
                {...field}
                id="name"
                type="text"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                readOnly={isSaved}
                disabled={isSaved}
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
        <Controller
          name="description"
          control={form.control}
          defaultValue=""
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="description">
                Описание
              </FieldLabel>
              <Input
                {...field}
                id="description"
                type="text"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                readOnly={isSaved}
                disabled={isSaved}
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
      </FieldGroup>

      {!isSaved && (
        <div className="flex justify-end gap-2">
          {removable && (
            <Button type="reset" variant="destructive" onClick={onRemove}>
              Отмена
            </Button>
          )}
          <Button type="submit" variant="default">
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
}

export { EquipmentCreateForm };
