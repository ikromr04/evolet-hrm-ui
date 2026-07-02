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
import { Equipment, equipmentUpdateSchema, EquipmentUpdateSchema, updateEquipmentAction } from '@/entities/equipment';

type EquipmentEditDialogProps = {
  trigger: JSX.Element;
  equipment: Equipment;
};

function EquipmentEditDialog({
  trigger,
  equipment,
}: EquipmentEditDialogProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const form = useForm<EquipmentUpdateSchema>({
    resolver: zodResolver(equipmentUpdateSchema),
    defaultValues: {
      id: equipment.id,
      name: equipment.name,
      description: equipment.description || undefined,
    }
  });

  const onSubmit = async (values: EquipmentUpdateSchema, evt?: BaseSyntheticEvent) => {
    evt?.preventDefault();

    const dirtyFields: EquipmentUpdateSchema = {
      id: equipment.id,
    };

    (Object.keys(form.formState.dirtyFields) as Array<keyof EquipmentUpdateSchema>)
      .forEach(<K extends keyof EquipmentUpdateSchema>(key: K) => {
        const value = values[key];

        if (value !== undefined) {
          dirtyFields[key] = value;
        }
      });

    await dispatch(updateEquipmentAction({ data: dirtyFields }))
      .unwrap()
      .then(() => {
        toast.success('Оборудование успешно обновлено.');
        form.reset(values);
        setIsOpen(false);
      })
      .catch((errors: ApiErrors) => {
        errors.forEach((error) => {
          if (error.source?.pointer) {
            form.setError(error.source.pointer.split('/').pop() as keyof EquipmentUpdateSchema, {
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
              Редактировать оборудования
            </DialogTitle>
            <DialogDescription>
              Обновите информацию об оборудовании
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
              disabled={form.formState.isSubmitting || !form.formState.isDirty}
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

export { EquipmentEditDialog };
