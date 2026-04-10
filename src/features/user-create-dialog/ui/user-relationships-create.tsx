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
  ScrollArea,
  Spinner,
} from '@/shared/ui';
import { AsyncStatus, useAppDispatch, useAppSelector } from '@/shared/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { Step } from './user-create-dialog';
import { ArrowRight, ChevronsUpDown, X } from 'lucide-react';
import { User, userUpdateSchema, UserUpdateSchema } from '@/entities/user';
import { getRoles, getRolesStatus } from '@/entities/role';
import { fetchRolesAction } from '@/entities/role';
import { cn } from '@/shared/lib';
import { fetchPositionsAction, getPositions, getPositionsStatus } from '@/entities/position';

type UserRelationshipsCreateProps = {
  setStep: Dispatch<SetStateAction<Step>>;
  user: User;
}

function UserRelationshipsCreate({
  setStep,
  user,
}: UserRelationshipsCreateProps): JSX.Element {
  const dispatch = useAppDispatch();
  const rolesStatus = useAppSelector(getRolesStatus);
  const positionsStatus = useAppSelector(getPositionsStatus);
  const roles = useAppSelector(getRoles);
  const positions = useAppSelector(getPositions);

  useEffect(() => {
    if (rolesStatus === AsyncStatus.IDLE) dispatch(fetchRolesAction());
    if (positionsStatus === AsyncStatus.IDLE) dispatch(fetchPositionsAction());
  }, [dispatch, positionsStatus, rolesStatus]);

  const form = useForm<UserUpdateSchema>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      userId: user.id,
    },
  });

  const onSubmit = async (data: UserUpdateSchema, evt?: BaseSyntheticEvent) => {
    evt?.preventDefault();
    console.log(data);

    // await dispatch(storeUserDetailAction({ payload: data }))
    //   .unwrap()
    //   .then(() => {
    //     toast.success('Данные успешно сохранены.');
    //     setStep('success');
    //   })
    //   .catch((errors: ApiErrors) => {
    //     errors.forEach((error) => {
    //       if (error.source?.pointer) {
    //         form.setError(error.source.pointer.split('/').pop() as keyof UserDetailStoreSchema, {
    //           message: error.detail
    //         });
    //       } else {
    //         toast.error(error.detail);
    //       }
    //     });
    //   });
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
                    Позиция
                  </FieldLabel>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="pr-2! py-1.25 min-h-8 h-max text-start whitespace-normal"
                    >
                      <span className={cn('grow flex flex-wrap gap-1', !values?.length && 'text-muted-foreground')}>
                        {!values?.length
                          ? 'Выберите'
                          : roles?.filter((role) => values.includes(role.id))
                            .map((role) => (
                              <Badge
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
                    Должность
                  </FieldLabel>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="pr-2! py-1.25 min-h-8 h-max text-start whitespace-normal"
                    >
                      <span className={cn('grow flex flex-wrap gap-1', !values?.length && 'text-muted-foreground')}>
                        {!values?.length
                          ? 'Выберите'
                          : positions?.filter((position) => values.includes(position.id))
                            .map((position) => (
                              <Badge
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

export { UserRelationshipsCreate };
