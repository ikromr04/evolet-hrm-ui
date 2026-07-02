import { Education, educationUpdateSchema, EducationUpdateSchema, updateEducationAction } from '@/entities/education';
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Spinner,
  Calendar as UiCalendar,
} from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { Calendar } from 'lucide-react';
import { BaseSyntheticEvent, JSX, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

type EducationEditDialogProps = {
  trigger: JSX.Element;
  education: Education;
};

function EducationEditDialog({
  trigger,
  education,
}: EducationEditDialogProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const form = useForm<EducationUpdateSchema>({
    resolver: zodResolver(educationUpdateSchema),
    defaultValues: {
      id: education.id,
      institution: education.institution,
      faculty: education.faculty,
      speciality: education.speciality,
      form: education.form,
      startedAt: education.startedAt,
      endedAt: education.endedAt || undefined,
    }
  });

  const onSubmit = async (values: EducationUpdateSchema, evt?: BaseSyntheticEvent) => {
    evt?.preventDefault();

    const dirtyFields: EducationUpdateSchema = {
      id: education.id,
    };

    (Object.keys(form.formState.dirtyFields) as Array<keyof EducationUpdateSchema>)
      .forEach(<K extends keyof EducationUpdateSchema>(key: K) => {
        const value = values[key];

        if (value !== undefined) {
          dirtyFields[key] = value;
        }
      });

    await dispatch(updateEducationAction({ data: dirtyFields }))
      .unwrap()
      .then(() => {
        toast.success('Образование успешно обновлено.');
        form.reset(values);
        setIsOpen(false);
      })
      .catch((errors: ApiErrors) => {
        errors.forEach((error) => {
          if (error.source?.pointer) {
            form.setError(error.source.pointer.split('/').pop() as keyof EducationUpdateSchema, {
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
              Редактировать образование
            </DialogTitle>
            <DialogDescription>
              Обновите информацию об образовании сотрудника
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="gap-3">
            <Controller
              name="institution"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="institution">
                    Учебное заведение <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="institution"
                    type="text"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
            <Controller
              name="faculty"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="faculty">
                    Факультет <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="faculty"
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
                name="speciality"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="speciality">
                      Специальность <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                      {...field}
                      id="speciality"
                      type="text"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                    />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
              <Controller
                name="form"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>
                      Форма обучения <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Select
                      value={field.value || ''}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите форму обучения" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectGroup>
                          <SelectItem value="Очно">Очно</SelectItem>
                          <SelectItem value="Заочно">Заочно</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Controller
                name="startedAt"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Popover>
                    <Field>
                      <FieldLabel>
                        Дата поступления <span className="text-destructive">*</span>
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
                        Дата окончания <span className="text-destructive">*</span>
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

export { EducationEditDialog };
