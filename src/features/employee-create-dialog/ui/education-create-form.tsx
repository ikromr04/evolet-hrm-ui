import { BaseSyntheticEvent, JSX, useState } from 'react';
import { User } from '@/entities/user';
import { ru } from 'date-fns/locale';
import { useAppDispatch } from '@/shared/store';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { ApiErrors } from '@/shared/api';
import { cn } from '@/shared/lib';
import dayjs from 'dayjs';
import {
  Button,
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
  Calendar as UiCalendar,
} from '@/shared/ui';
import { Calendar } from 'lucide-react';
import { educationStoreSchema, EducationStoreSchema, storeEducationAction } from '@/entities/education';

type EducationCreateFormProps = {
  onRemove?: () => void;
  removable?: boolean;
  onSave: () => void;
  user: User;
}

function EducationCreateForm({
  onRemove,
  removable,
  onSave,
  user,
}: EducationCreateFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [isSaved, setIsSaved] = useState(false);

  const form = useForm<EducationStoreSchema>({
    resolver: zodResolver(educationStoreSchema),
    defaultValues: {
      userId: user.id,
    },
  });

  const onSubmit = async (data: EducationStoreSchema, evt?: BaseSyntheticEvent) => {
    evt?.preventDefault();

    await dispatch(storeEducationAction({ payload: data }))
      .unwrap()
      .then(() => {
        toast.success('Данные успешно сохранены.');
        setIsSaved(true);
        onSave();
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
    <form
      className="flex flex-col gap-3"
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
    >
      <FieldGroup className="gap-3">
        <Controller
          name="institution"
          control={form.control}
          defaultValue=""
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
                readOnly={isSaved}
                disabled={isSaved}
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
        <Controller
          name="faculty"
          control={form.control}
          defaultValue=""
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
                readOnly={isSaved}
                disabled={isSaved}
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
        <div className="grid md:grid-cols-2 gap-4">
          <Controller
            name="speciality"
            control={form.control}
            defaultValue=""
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
                  readOnly={isSaved}
                  disabled={isSaved}
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
          <Controller
            name="form"
            control={form.control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>
                  Форма обучения <span className="text-destructive">*</span>
                </FieldLabel>
                <Select
                  value={field.value || ''}
                  onValueChange={(value) => field.onChange(value)}
                  disabled={isSaved}
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
            defaultValue=""
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
                      disabled={isSaved}
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
            defaultValue=""
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
                      disabled={isSaved}
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

export { EducationCreateForm };
