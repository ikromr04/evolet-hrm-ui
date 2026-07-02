import { BaseSyntheticEvent, JSX, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch } from '@/shared/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { FamilyStatus, Sex, ProfileStoreSchema, profileStoreSchema, storeProfileAction } from '@/entities/profile';
import { cn, getYearsRange } from '@/shared/lib';
import { ArrowRight, Calendar, ChevronsUpDown, X } from 'lucide-react';
import dayjs from 'dayjs';
import { ru } from 'date-fns/locale';
import { toast } from 'sonner';
import { ApiErrors } from '@/shared/api';
import {
  Badge,
  Button,
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
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
import { User } from '@/entities/user';

type ProfileCreateDialogProps = {
  trigger: JSX.Element;
  user: User;
}

function ProfileCreateDialog({
  trigger,
  user,
}: ProfileCreateDialogProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const form = useForm<ProfileStoreSchema>({
    resolver: zodResolver(profileStoreSchema),
    defaultValues: {
      userId: user.id,
      birthDate: undefined,
      sex: undefined,
      nationality: undefined,
      citizenship: undefined,
      address: undefined,
      tel1: undefined,
      tel2: undefined,
      familyStatus: undefined,
      children: undefined,
      startedWorkAt: undefined,
    },
  });

  const onSubmit = async (values: ProfileStoreSchema, evt?: BaseSyntheticEvent) => {
    evt?.preventDefault();

    const dirtyFields: ProfileStoreSchema = {
      userId: user.id,
    };

    (Object.keys(form.formState.dirtyFields) as Array<keyof ProfileStoreSchema>)
      .forEach(<K extends keyof ProfileStoreSchema>(key: K) => {
        const value = values[key];

        if (value !== undefined) {
          dirtyFields[key] = value;
        }
      });

    await dispatch(storeProfileAction({ data: dirtyFields }))
      .unwrap()
      .then(() => toast.success('Профиль успешно обновлен.'))
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
            <DialogTitle className="pr-10 leading-[1.2]">
              Профиль сотрудника
            </DialogTitle>
            <DialogDescription>
              Обновите личную, контактную и рабочую информацию сотрудника.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <div className="grid md:grid-cols-2 gap-4">
              <Controller
                name="birthDate"
                control={form.control}
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
                                key={year}
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
                            {getYearsRange(1960).map((year) => (
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
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
              >
                Отмена
                <ArrowRight size={16} />
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting || !form.formState.isDirty}
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

export { ProfileCreateDialog };
