import { educationStoreSchema, EducationStoreSchema, storeEducationAction } from '@/entities/education';
import { updateUser, User } from '@/entities/user';
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

type EducationCreateDialogProps = {
  trigger: JSX.Element;
  user: User;
};

function EducationCreateDialog({
  trigger,
  user,
}: EducationCreateDialogProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const form = useForm<EducationStoreSchema>({
    resolver: zodResolver(educationStoreSchema),
    defaultValues: {
      userId: user.id,
      institution: '',
      faculty: '',
      speciality: '',
      form: '',
      startedAt: '',
      endedAt: '',
    }
  });

  const onSubmit = async (values: EducationStoreSchema, evt?: BaseSyntheticEvent) => {
    evt?.preventDefault();

    await dispatch(storeEducationAction({ data: values }))
      .unwrap()
      .then((education) => {
        toast.success('Образование успешно добавлено.');
        form.reset(values);
        dispatch(updateUser({
          ...user,
          educations: [...user.educations, education.id],
        }));
        setIsOpen(false);
      })
      .catch((errors: ApiErrors) => {
        errors.forEach((error) => {
          if (error.source?.pointer) {
            form.setError(error.source.pointer.split('/').pop() as keyof EducationStoreSchema, {
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
              Образование ({user.surname} {user.name})
            </DialogTitle>
            <DialogDescription>
              Добавьте информацию об образовании сотрудника
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

export { EducationCreateDialog };
