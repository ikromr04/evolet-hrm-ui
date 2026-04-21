import { fetchDepartmentsAction, getDepartments, getDepartmentsStatus } from '@/entities/department';
import { fetchLanguagesAction, getLanguages, getLanguagesStatus, LanguageLevel } from '@/entities/language';
import { fetchPositionsAction, getPositions, getPositionsStatus } from '@/entities/position';
import { fetchRolesAction, getRoles, getRolesStatus } from '@/entities/role';
import { updateUserAction, User, userUpdateSchema, UserUpdateSchema } from '@/entities/user';
import { ApiErrors } from '@/shared/api';
import { cn } from '@/shared/lib';
import { AsyncStatus, useAppDispatch, useAppSelector } from '@/shared/store';
import {
  Badge,
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
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
  Spinner,
} from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronsUpDown, X } from 'lucide-react';
import { BaseSyntheticEvent, JSX, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

type UserUpdateDialogProps = {
  trigger: JSX.Element;
  user: User;
};

function UserUpdateDialog({
  trigger,
  user,
}: UserUpdateDialogProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const rolesStatus = useAppSelector(getRolesStatus);
  const positionsStatus = useAppSelector(getPositionsStatus);
  const departmentsStatus = useAppSelector(getDepartmentsStatus);
  const languagesStatus = useAppSelector(getLanguagesStatus);

  const roles = useAppSelector(getRoles);
  const positions = useAppSelector(getPositions);
  const departments = useAppSelector(getDepartments);
  const languages = useAppSelector(getLanguages);

  useEffect(() => {
    if (rolesStatus === AsyncStatus.IDLE) dispatch(fetchRolesAction());
    if (positionsStatus === AsyncStatus.IDLE) dispatch(fetchPositionsAction());
    if (departmentsStatus === AsyncStatus.IDLE) dispatch(fetchDepartmentsAction());
    if (languagesStatus === AsyncStatus.IDLE) dispatch(fetchLanguagesAction());
  }, [departmentsStatus, dispatch, languagesStatus, positionsStatus, rolesStatus]);

  const form = useForm<UserUpdateSchema>({
    mode: 'onChange',
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      id: user.id,
      surname: user.surname,
      name: user.name,
      patronymic: user.patronymic ?? undefined,
      email: user.email,
      roles: user.roles,
      positions: user.positions,
      departments: user.departments,
      languages: user.languages,
    }
  });

  const onSubmit = async (values: UserUpdateSchema, evt?: BaseSyntheticEvent) => {
    evt?.preventDefault();

    const dirtyFields = Object.keys(form.formState.dirtyFields).reduce((acc, key) => {
      acc[key as keyof UserUpdateSchema] = values[key as keyof UserUpdateSchema];
      return acc;
    }, { id: user.id } as UserUpdateSchema);

    await dispatch(updateUserAction({ data: dirtyFields }))
      .unwrap()
      .then(() => {
        toast.success('Данные успешно обновлены.');
        form.reset(values);
        setOpen(false);
      })
      .catch((errors: ApiErrors) => {
        errors.forEach((error) => {
          if (error.source?.pointer) {
            form.setError(error.source.pointer.split('/').pop() as keyof UserUpdateSchema, {
              message: error.detail
            });
          } else {
            toast.error(error.detail);
          }
        });
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>

      <DialogContent className="max-h-[calc(100vh-2rem)] overflow-auto">
        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(onSubmit)}
          id="user-update-form"
          noValidate
        >
          <DialogHeader>
            <DialogTitle>
              Редактирование сотрудника
            </DialogTitle>
            <DialogDescription>
              Измените данные сотрудника и сохраните изменения.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Controller
              name="surname"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="surname">
                    Фамилия <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="surname"
                    type="text"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    required
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="name">
                    Имя <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    type="text"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    required
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
            <Controller
              name="patronymic"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="patronymic">
                    Отчество
                  </FieldLabel>
                  <Input
                    {...field}
                    id="patronymic"
                    type="text"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="email">
                    Email <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    required
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
            <Controller
              name="roles"
              control={form.control}
              render={({ field, fieldState }) => {
                const values: string[] | undefined = field.value;

                const toggleValue = (value: string) => {
                  let current = values ?? [];
                  current = current.includes(value)
                    ? current.filter(v => v !== value)
                    : [...current, value];

                  field.onChange(current);
                };

                return (
                  <Popover>
                    <Field>
                      <FieldLabel>
                        Позиция
                      </FieldLabel>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="pr-2! py-1.25 min-h-8 h-max text-start whitespace-normal"
                        >
                          <span className={cn('grow flex flex-wrap gap-1', !values?.length && 'text-muted-foreground')}>
                            {!values?.length
                              ? 'Выберите позицию'
                              : roles?.filter((role) => values.includes(role.id))
                                .map((role) => (
                                  <Badge
                                    key={role.id}
                                    variant="outline"
                                    onClick={(evt) => {
                                      toggleValue(role.id);
                                      evt.stopPropagation();
                                    }}
                                  >
                                    {role.displayName}
                                    <X size={8} />
                                  </Badge>
                                ))
                            }
                          </span>
                          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>

                      <FieldError errors={[fieldState.error]} />
                    </Field>

                    <PopoverContent
                      className="w-88 p-0"
                      onWheel={(evt) => evt.stopPropagation()}
                    >
                      <Command>
                        <CommandInput placeholder="Поиск..." />

                        <CommandList>
                          <CommandEmpty>
                            Позиция не найдена
                          </CommandEmpty>
                          <CommandGroup>
                            {roles?.map((role) => (
                              <CommandItem
                                key={role.name}
                                data-checked={field.value?.includes(role.id)}
                                onSelect={() => toggleValue(role.id)}
                              >
                                {role.displayName}
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
            <Controller
              name="positions"
              control={form.control}
              render={({ field, fieldState }) => {
                const values: string[] | undefined = field.value;

                const toggleValue = (value: string) => {
                  let current = values ?? [];
                  current = current.includes(value)
                    ? current.filter(v => v !== value)
                    : [...current, value];

                  field.onChange(current);
                };

                return (
                  <Popover>
                    <Field>
                      <FieldLabel>
                        Должность
                      </FieldLabel>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="pr-2! py-1.25 min-h-8 h-max text-start whitespace-normal"
                        >
                          <span className={cn('grow flex flex-wrap gap-1', !values?.length && 'text-muted-foreground')}>
                            {!values?.length
                              ? 'Выберите должность'
                              : positions?.filter((position) => values.includes(position.id))
                                .map((position) => (
                                  <Badge
                                    key={position.id}
                                    variant="outline"
                                    onClick={(evt) => {
                                      toggleValue(position.id);
                                      evt.stopPropagation();
                                    }}
                                  >
                                    {position.name}
                                    <X size={8} />
                                  </Badge>
                                ))
                            }
                          </span>
                          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>

                      <FieldError errors={[fieldState.error]} />
                    </Field>

                    <PopoverContent
                      className="w-88 p-0"
                      onWheel={(evt) => evt.stopPropagation()}
                    >
                      <Command>
                        <CommandInput placeholder="Поиск..." />

                        <CommandList>
                          <CommandEmpty>
                            Должность не найдена
                          </CommandEmpty>
                          <CommandGroup>
                            {positions?.map((position) => (
                              <CommandItem
                                key={position.id}
                                data-checked={field.value?.includes(position.id)}
                                onSelect={() => toggleValue(position.id)}
                              >
                                {position.name}
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
            <Controller
              name="departments"
              control={form.control}
              render={({ field, fieldState }) => {
                const values: string[] | undefined = field.value;

                const toggleValue = (value: string) => {
                  if (value === 'none') return field.onChange(undefined);

                  let current = values ?? [];
                  current = current.includes(value)
                    ? current.filter(v => v !== value)
                    : [...current, value];

                  field.onChange(current);
                };

                return (
                  <Popover>
                    <Field>
                      <FieldLabel>
                        Отдел/Департамент
                      </FieldLabel>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="pr-2! py-1.25 min-h-8 h-max text-start whitespace-normal"
                        >
                          <span className={cn('grow flex flex-wrap gap-1', !values?.length && 'text-muted-foreground')}>
                            {!values?.length
                              ? 'Выберите отдел'
                              : departments?.filter((department) => values.includes(department.id))
                                .map((department) => (
                                  <Badge
                                    key={department.id}
                                    variant="outline"
                                    onClick={(evt) => {
                                      toggleValue(department.id);
                                      evt.stopPropagation();
                                    }}
                                  >
                                    {department.name}
                                    <X size={8} />
                                  </Badge>
                                ))
                            }
                          </span>
                          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>

                      <FieldError errors={[fieldState.error]} />
                    </Field>

                    <PopoverContent
                      className="w-88 p-0"
                      onWheel={(evt) => evt.stopPropagation()}
                    >
                      <Command>
                        <CommandInput placeholder="Поиск..." />

                        <CommandList>
                          <CommandEmpty>
                            Отдел не найдена
                          </CommandEmpty>
                          <CommandGroup>
                            {departments?.map((department) => (
                              <CommandItem
                                key={department.id}
                                data-checked={field.value?.includes(department.id)}
                                onSelect={() => toggleValue(department.id)}
                              >
                                {department.name}
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
            <Controller
              name="languages"
              control={form.control}
              render={({ field, fieldState }) => {
                const values: string[] | undefined = field.value;

                const toggleValue = (value: string) => {
                  let current = values ?? [];
                  current = current.includes(value)
                    ? current.filter(v => v !== value)
                    : [...current, value];

                  field.onChange(current);
                };

                return (
                  <Popover>
                    <Field>
                      <FieldLabel>
                        Знание языков
                      </FieldLabel>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="pr-2! py-1.25 min-h-8 h-max text-start whitespace-normal"
                        >
                          <span className={cn('grow flex flex-wrap gap-1', !values?.length && 'text-muted-foreground')}>
                            {!values?.length
                              ? 'Выберите язык'
                              : languages?.filter((language) => values.includes(language.id))
                                .map((language) => (
                                  <Badge
                                    key={language.id}
                                    variant="outline"
                                    onClick={(evt) => {
                                      toggleValue(language.id);
                                      evt.stopPropagation();
                                    }}
                                  >
                                    {language.name} - {language.level}
                                    <X size={8} />
                                  </Badge>
                                ))
                            }
                          </span>
                          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>

                      <FieldError errors={[fieldState.error]} />
                    </Field>

                    <PopoverContent
                      className="w-88 p-0"
                      onWheel={(evt) => evt.stopPropagation()}
                    >
                      <Command>
                        <CommandInput placeholder="Поиск..." />

                        <CommandList>
                          <CommandEmpty>
                            Язык не найдена
                          </CommandEmpty>
                          <CommandGroup>
                            {languages?.map((language) => (
                              <CommandItem
                                key={language.id}
                                data-checked={field.value?.includes(language.id)}
                                onSelect={() => toggleValue(language.id)}
                              >
                                {language.name} {LanguageLevel[language.level]}
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
              <Button type="button" variant="outline">
                Отмена
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting || !form.formState.isDirty}
              form="user-update-form"
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

export { UserUpdateDialog };
