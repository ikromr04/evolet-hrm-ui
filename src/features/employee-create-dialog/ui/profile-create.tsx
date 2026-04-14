import { BaseSyntheticEvent, Dispatch, JSX, SetStateAction } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch } from '@/shared/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { Step } from './employee-create-dialog';
import { storeProfileAction, profileStoreSchema, ProfileStoreSchema, FamilyStatus, Sex } from '@/entities/profile';
import { cn } from '@/shared/lib';
import { ArrowRight, Calendar, ChevronsUpDown, X } from 'lucide-react';
import { User } from '@/entities/user';
import dayjs from 'dayjs';
import { ru } from 'date-fns/locale';
import { getChildrenYears } from '../lib/utils';
import { toast } from 'sonner';
import { ApiErrors } from '@/shared/api';
import {
  Badge,
  Button,
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Spinner,
  Calendar as UiCalendar,
} from '@/shared/ui';

type ProfileCreateProps = {
  setStep: Dispatch<SetStateAction<Step>>;
  user: User;
}

function ProfileCreate({
  setStep,
  user,
}: ProfileCreateProps): JSX.Element {
  const dispatch = useAppDispatch();

  const form = useForm<ProfileStoreSchema>({
    resolver: zodResolver(profileStoreSchema),
    defaultValues: {
      userId: user.id,
    },
  });

  const onSubmit = async (data: ProfileStoreSchema, evt?: BaseSyntheticEvent) => {
    evt?.preventDefault();

    await dispatch(storeProfileAction({ payload: data }))
      .unwrap()
      .then(() => {
        toast.success('Данные успешно сохранены.');
        setStep('relationships');
      })
      .catch((errors: ApiErrors) => {
        errors.forEach((error) => {
          if (error.source?.pointer) {
            form.setError(error.source.pointer.split('/').pop() as keyof ProfileStoreSchema, {
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
                  <FieldLabel>
                    Дата рождения
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
            name="sex"
            control={form.control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>
                  Пол
                </FieldLabel>
                <Select
                  value={field.value || ''}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите пол" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectGroup>
                      {Object.entries(Sex).map(([key, value]) => (
                        <SelectItem key={key} value={key}>{value}</SelectItem>
                      ))}
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
                  <FieldLabel>
                    Начало работы
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
            name="familyStatus"
            control={form.control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>
                  Семейное положение
                </FieldLabel>
                <Select
                  value={field.value || ''}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите семейное положение" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectGroup>
                      {Object.entries(FamilyStatus).map(([key, value]) => (
                        <SelectItem key={key} value={key}>{value}</SelectItem>
                      ))}
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
                  <FieldLabel>
                    Дети
                  </FieldLabel>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="pr-2! py-1.25 min-h-8 h-max text-start whitespace-normal"
                    >
                      {!values && (
                        <span className="text-muted-foreground">
                          Выберите возраст детей
                        </span>
                      )}
                      <span className="grow flex flex-wrap gap-1">
                        {values && values.length === 0 && 'Нет детей'}
                        {values && values.length > 0 && values.map((year) => (
                          <Badge
                            variant="outline"
                            onClick={(evt) => {
                              toggleValue(year);
                              evt.stopPropagation();
                            }}
                          >
                            {year}
                            <X size={8} />
                          </Badge>
                        ))}
                      </span>
                      <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>

                  <FieldError errors={[fieldState.error]} />
                </Field>

                <PopoverContent
                  className="w-44 h-64 p-0"
                  align="start"
                  onWheel={(e) => e.stopPropagation()}
                >
                  <Command>
                    <CommandList>
                      <CommandGroup>
                        <CommandItem
                          data-checked={!values}
                          onSelect={() => toggleValue('')}
                        >
                          Не указать
                        </CommandItem>
                        <CommandItem
                          data-checked={values?.length === 0}
                          onSelect={() => toggleValue('none')}
                        >
                          Нет детей
                        </CommandItem>
                        {getChildrenYears().map((year) => (
                          <CommandItem
                            key={year}
                            data-checked={values?.includes(year)}
                            onSelect={() => toggleValue(year)}
                          >
                            {year}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
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
          onClick={() => setStep('relationships')}
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

export { ProfileCreate };
