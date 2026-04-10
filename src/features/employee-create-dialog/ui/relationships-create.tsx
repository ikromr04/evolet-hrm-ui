import { BaseSyntheticEvent, Dispatch, JSX, SetStateAction, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Badge,
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
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
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
} from '@/shared/ui';
import { cn } from '@/shared/lib';
import { AsyncStatus, useAppDispatch, useAppSelector } from '@/shared/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { Step } from './employee-create-dialog';
import { ArrowRight, ChevronsUpDown, X } from 'lucide-react';
import { updateUserAction, User, userUpdateSchema, UserUpdateSchema } from '@/entities/user';
import { getRoles, getRolesStatus } from '@/entities/role';
import { fetchRolesAction } from '@/entities/role';
import { fetchPositionsAction, getPositions, getPositionsStatus } from '@/entities/position';
import { fetchDepartmentsAction, getDepartments, getDepartmentsStatus } from '@/entities/department';
import { fetchLanguagesAction, getLanguages, getLanguagesStatus, LanguageLevel } from '@/entities/language';
import { toast } from 'sonner';
import { ApiErrors } from '@/shared/api';

type RelationshipsCreateProps = {
  setStep: Dispatch<SetStateAction<Step>>;
  user: User;
}

function RelationshipsCreate({
  setStep,
  user,
}: RelationshipsCreateProps): JSX.Element {
  const dispatch = useAppDispatch();

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
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      id: user.id,
    },
  });

  const onSubmit = async (data: UserUpdateSchema, evt?: BaseSyntheticEvent) => {
    evt?.preventDefault();

    await dispatch(updateUserAction({ payload: data }))
      .unwrap()
      .then(() => {
        toast.success('Данные успешно сохранены.');
        setStep('equipments');
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
    <form
      className="flex flex-col gap-6"
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
    >
      <DialogHeader>
        <DialogTitle className="pr-10 leading-[1.2]">
          Орг. структура ({user.surname} {user.name})
        </DialogTitle>
        <DialogDescription>
          Заполните организационную структуру и языковые навыки пользователя.
        </DialogDescription>
      </DialogHeader>

      <FieldGroup>
        <Controller
          name="roles"
          control={form.control}
          defaultValue={undefined}
          render={({ field, fieldState }) => {
            const values: string[] | undefined = field.value;

            const toggleValue = (value: string) => {
              let current = values ?? [];
              current = current.includes(value)
                ? current.filter(v => v !== value)
                : [...current, value];

              field.onChange(
                current.length === 0 ? undefined : current
              );
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
          defaultValue={undefined}
          render={({ field, fieldState }) => {
            const values: string[] | undefined = field.value;

            const toggleValue = (value: string) => {
              let current = values ?? [];
              current = current.includes(value)
                ? current.filter(v => v !== value)
                : [...current, value];

              field.onChange(
                current.length === 0 ? undefined : current
              );
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
          defaultValue={undefined}
          render={({ field, fieldState }) => {
            const values: string[] | undefined = field.value;

            const toggleValue = (value: string) => {
              if (value === 'none') return field.onChange(undefined);

              let current = values ?? [];
              current = current.includes(value)
                ? current.filter(v => v !== value)
                : [...current, value];

              field.onChange(
                current.length === 0 ? undefined : current
              );
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
          defaultValue={undefined}
          render={({ field, fieldState }) => {
            const values: string[] | undefined = field.value;

            const toggleValue = (value: string) => {
              let current = values ?? [];
              current = current.includes(value)
                ? current.filter(v => v !== value)
                : [...current, value];

              field.onChange(
                current.length === 0 ? undefined : current
              );
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
                            {language.name} ({language.level}) - {LanguageLevel[language.level]}
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
          onClick={() => setStep('equipments')}
        >
          Пропустить
          <ArrowRight size={16} />
        </Button>
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting && <Spinner />}
          Сохранить
        </Button>
      </DialogFooter>
    </form>
  );
}

export { RelationshipsCreate };
