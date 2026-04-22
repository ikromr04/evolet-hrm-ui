import { ApiErrors } from '@/shared/api';
import { cn } from '@/shared/lib';
import { useAppDispatch } from '@/shared/store';
import { ru } from 'date-fns/locale';
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
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Calendar as UiCalendar,
} from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { Calendar } from 'lucide-react';
import { BaseSyntheticEvent, JSX, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Experience, experienceUpdateSchema, ExperienceUpdateSchema, updateExperienceAction } from '@/entities/experience';

type ExperienceEditDialogProps = {
  trigger: JSX.Element;
  experience: Experience;
};

function ExperienceEditDialog({
  trigger,
  experience,
}: ExperienceEditDialogProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const form = useForm<ExperienceUpdateSchema>({
    resolver: zodResolver(experienceUpdateSchema),
    defaultValues: {
      id: experience.id,
      companyName: experience.companyName,
      position: experience.position,
      startedAt: experience.startedAt,
      endedAt: experience.endedAt,
    }
  });

  const onSubmit = async (values: ExperienceUpdateSchema, evt?: BaseSyntheticEvent) => {
    evt?.preventDefault();

    const dirtyFields: ExperienceUpdateSchema = {
      id: experience.id,
    };

    (Object.keys(form.formState.dirtyFields) as Array<keyof ExperienceUpdateSchema>)
      .forEach(<K extends keyof ExperienceUpdateSchema>(key: K) => {
        const value = values[key];

        if (value !== undefined) {
          dirtyFields[key] = value;
        }
      });

    await dispatch(updateExperienceAction({ data: dirtyFields }))
      .unwrap()
      .then(() => {
        toast.success('Опыт работы успешно обновлен.');
        form.reset(values);
        setIsOpen(false);
      })
      .catch((errors: ApiErrors) => {
        errors.forEach((error) => {
          if (error.source?.pointer) {
            form.setError(error.source.pointer.split('/').pop() as keyof ExperienceUpdateSchema, {
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
              Редактировать опыт
            </DialogTitle>
            <DialogDescription>
              Обновите информацию об опыте сотрудника
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="gap-3">
            <Controller
              name="companyName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="companyName">
                    Название организации/компании <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="companyName"
                    type="text"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
            <Controller
              name="position"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="position">
                    Должность <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="position"
                    type="text"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
            <div className="grid md:grid-cols-2 gap-4">
              <Controller
                name="startedAt"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Popover>
                    <Field>
                      <FieldLabel>
                        Начало работы <span className="text-destructive">*</span>
                      </FieldLabel>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full justify-start text-left',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {field.value ? dayjs(field.value).format('DD MMM YYYY') : 'Выберите дату'}
                        </Button>
                      </PopoverTrigger>
                      <FieldError errors={[fieldState.error]} />
                    </Field>

                    <PopoverContent className="p-0 w-max" align="start">
                      <UiCalendar
                        locale={ru}
                        mode="single"
                        selected={field.value ? dayjs(field.value).toDate() : undefined}
                        onSelect={(value) => field.onChange(dayjs(value).format('YYYY-MM-DD'))}
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
              <Controller
                name="endedAt"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Popover>
                    <Field>
                      <FieldLabel>
                        Конец работы <span className="text-destructive">*</span>
                      </FieldLabel>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full justify-start text-left',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {field.value ? dayjs(field.value).format('DD MMM YYYY') : 'Выберите дату'}
                        </Button>
                      </PopoverTrigger>
                      <FieldError errors={[fieldState.error]} />
                    </Field>

                    <PopoverContent className="p-0 w-max" align="start">
                      <UiCalendar
                        locale={ru}
                        mode="single"
                        selected={field.value ? dayjs(field.value).toDate() : undefined}
                        onSelect={(value) => field.onChange(dayjs(value).format('YYYY-MM-DD'))}
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
            </div>
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

export { ExperienceEditDialog };
