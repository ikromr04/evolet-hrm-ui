import { BaseSyntheticEvent, Dispatch, JSX, SetStateAction } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Spinner,
  Calendar as UiCalendar,
} from '@/shared/ui';
import { useAppDispatch } from '@/shared/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { Step } from './user-create-dialog';
import { storeUserDetailAction, userDetailStoreSchema, UserDetailStoreSchema } from '@/entities/user-detail';
import { cn } from '@/shared/lib';
import { ArrowRight, Calendar, ChevronsUpDown } from 'lucide-react';
import { User } from '@/entities/user';
import dayjs from 'dayjs';
import { ru } from 'date-fns/locale';
import { getChildrenYears } from '../lib/utils';
import { toast } from 'sonner';
import { ApiErrors } from '@/shared/api';

type UserDetailCreateProps = {
  setStep: Dispatch<SetStateAction<Step>>;
  user: User;
}

function UserDetailCreate({
  setStep,
  user,
}: UserDetailCreateProps): JSX.Element {
  const dispatch = useAppDispatch();

  const form = useForm<UserDetailStoreSchema>({
    resolver: zodResolver(userDetailStoreSchema),
    defaultValues: {
      userId: user.id,
    },
  });

  const onSubmit = async (data: UserDetailStoreSchema, evt?: BaseSyntheticEvent) => {
    evt?.preventDefault();

    await dispatch(storeUserDetailAction({ payload: data }))
      .unwrap()
      .then(() => {
        toast.success('Данные успешно сохранены.');
        setStep('success');
      })
      .catch((errors: ApiErrors) => {
        errors.forEach((error) => {
          if (error.source?.pointer) {
            form.setError(error.source.pointer.split('/').pop() as keyof UserDetailStoreSchema, {
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
        <DialogTitle className="pr-10 leading-[1.2]">
          Данные сотрудника ({user.surname} {user.name})
        </DialogTitle>
        <DialogDescription>
          Заполните личную, контактную и рабочую информацию сотрудника.
        </DialogDescription>
      </DialogHeader>

      <FieldGroup>
        <div className="grid md:grid-cols-2 gap-4">
          <Controller
            name="birthDate"
            control={form.control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <Popover>
                <Field>
                  <FieldLabel asChild>
                    <div>Дата рождения</div>
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

                <PopoverContent className="w-max p-0 border-none">
                  <UiCalendar
                    locale={ru}
                    mode="single"
                    selected={field.value ? dayjs(field.value).toDate() : undefined}
                    onSelect={(value) => field.onChange(dayjs(value).format('YYYY-MM-DD'))}
                    className="rounded-lg border"
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
            )}
          />
          <Controller
            name="sex"
            control={form.control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel asChild>
                  <div>Пол</div>
                </FieldLabel>
                <Select
                  value={field.value || ''}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите пол" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="male">Мужской</SelectItem>
                      <SelectItem value="female">Женский</SelectItem>
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
            name="nationality"
            control={form.control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="nationality">
                  Национальность
                </FieldLabel>
                <Input
                  {...field}
                  id="nationality"
                  type="text"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
          <Controller
            name="citizenship"
            control={form.control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="citizenship">
                  Гражданство
                </FieldLabel>
                <Input
                  {...field}
                  id="citizenship"
                  type="text"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
        </div>
        <Controller
          name="address"
          control={form.control}
          defaultValue=""
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="address">
                Адрес
              </FieldLabel>
              <Input
                {...field}
                id="address"
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
            name="tel1"
            control={form.control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="tel1">
                  Тел 1
                </FieldLabel>
                <Input
                  {...field}
                  id="tel1"
                  type="text"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
          <Controller
            name="tel2"
            control={form.control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="tel2">
                  Тел 2
                </FieldLabel>
                <Input
                  {...field}
                  id="tel2"
                  type="text"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Controller
            name="startedWorkAt"
            control={form.control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <Popover>
                <Field>
                  <FieldLabel asChild>
                    <div>Начало работы</div>
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

                <PopoverContent className="w-max p-0 border-none">
                  <UiCalendar
                    locale={ru}
                    mode="single"
                    selected={field.value ? dayjs(field.value).toDate() : undefined}
                    onSelect={(value) => field.onChange(dayjs(value).format('YYYY-MM-DD'))}
                    className="rounded-lg border"
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
            )}
          />
          <Controller
            name="familyStatus"
            control={form.control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel asChild>
                  <div>Семейное положение</div>
                </FieldLabel>
                <Select
                  value={field.value || ''}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите семейное положение" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="single_man">Не женат</SelectItem>
                      <SelectItem value="single_woman">Не замужем</SelectItem>
                      <SelectItem value="married_man">Женат</SelectItem>
                      <SelectItem value="married_woman">Замужем</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
        </div>
        <Controller
          control={form.control}
          name="children"
          render={({ field, fieldState }) => {
            const values: number[] | undefined = field.value;

            const toggleValue = (raw: number | string) => {
              if (raw === 'none') return field.onChange([]);
              if (raw === '') return field.onChange(undefined);

              const value = Number(raw);
              const current = values ?? [];

              field.onChange(
                current.includes(value)
                  ? current.filter(v => v !== value)
                  : [...current, value]
              );
            };

            return (
              <Popover>
                <Field>
                  <FieldLabel asChild>
                    <div>Дети</div>
                  </FieldLabel>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-between pr-2!">
                      {!values && (
                        <span className="text-muted-foreground">
                          Выберите возраст детей
                        </span>
                      )}
                      {values && values.length === 0 && 'Нет детей'}
                      {values && values.length > 0 && values.join(', ')}
                      <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>

                  <FieldError errors={[fieldState.error]} />
                </Field>

                <PopoverContent className="p-0">
                  <ScrollArea className="h-58 p-2">
                    <div className="grid grid-cols-4 gap-1">
                      <Button
                        className="col-span-2"
                        type="button"
                        onClick={() => toggleValue('')}
                        variant={!values ? 'outline' : 'ghost'}
                      >
                        Не указать
                      </Button>
                      <Button
                        className="col-span-2"
                        type="button"
                        onClick={() => toggleValue('none')}
                        variant={values?.length === 0 ? 'outline' : 'ghost'}
                      >
                        Нет детей
                      </Button>
                      {getChildrenYears().map((year) => (
                        <Button
                          key={year}
                          type="button"
                          onClick={() => toggleValue(year)}
                          variant={values?.includes(year) ? 'outline' : 'ghost'}
                        >
                          {year}
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                </PopoverContent>
              </Popover>
            );
          }}
        />
      </FieldGroup>

      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={() => setStep('success')}
        >
          Пропустить
          <ArrowRight size={16} />
        </Button>
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && <Spinner />}
          Сохранить
        </Button>
      </DialogFooter>
    </form>
  );
}

export default UserDetailCreate;
