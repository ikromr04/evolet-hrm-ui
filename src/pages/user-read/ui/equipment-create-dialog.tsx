import { updateUser, User } from '@/entities/user';
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
import { equipmentStoreSchema, EquipmentStoreSchema, storeEquipmentAction } from '@/entities/equipment';

type EquipmentCreateDialogProps = {
  trigger: JSX.Element;
  user: User;
};

function EquipmentCreateDialog({
  trigger,
  user,
}: EquipmentCreateDialogProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const form = useForm<EquipmentStoreSchema>({
    resolver: zodResolver(equipmentStoreSchema),
    defaultValues: {
      userId: user.id,
      name: '',
      description: '',
    }
  });

  const onSubmit = async (values: EquipmentStoreSchema, evt?: BaseSyntheticEvent) => {
    evt?.preventDefault();

    await dispatch(storeEquipmentAction({ data: values }))
      .unwrap()
      .then((equipment) => {
        toast.success('Оборудование успешно добавлено.');
        form.reset(values);
        dispatch(updateUser({
          ...user,
          equipments: [...user.equipments, equipment.id],
        }));
        setIsOpen(false);
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
            <DialogTitle>
              Оборудование ({user.surname} {user.name})
            </DialogTitle>
            <DialogDescription>
              Добавьте выданное сотруднику оборудование
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="gap-3">
            <Controller
              name="name"
              control={form.control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="name">
                    Название <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    type="text"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
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
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && <Spinner />}
              Добавить
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export { EquipmentCreateDialog };
