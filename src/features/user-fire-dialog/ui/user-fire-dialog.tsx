import { BaseSyntheticEvent, JSX, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch } from '@/shared/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { ApiErrors } from '@/shared/api';
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
  Spinner,
} from '@/shared/ui';
import { fireUserAction, User, userFireSchema, UserFireSchema } from '@/entities/user';

type UserFireDialogProps = {
  trigger: JSX.Element;
  user: Pick<User, 'id' | 'name' | 'surname'>;
}

function UserFireDialog({
  trigger,
  user,
}: UserFireDialogProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const form = useForm<UserFireSchema>({
    resolver: zodResolver(userFireSchema),
    defaultValues: {
      id: user.id,
      reason: undefined,
    },
  });

  const onSubmit = async (data: UserFireSchema, evt?: BaseSyntheticEvent) => {
    evt?.preventDefault();

    await dispatch(fireUserAction({ data }))
      .unwrap()
      .then(() => toast.success('Сотрудник успешно уволен.'))
      .catch((errors: ApiErrors) => {
        errors.forEach((error) => {
          if (error.source?.pointer) {
            form.setError(error.source.pointer.split('/').pop() as keyof UserFireSchema, {
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
              Уволить сотрудника
            </DialogTitle>
            <DialogDescription>
              Вы уверены что хотите уволить сотрудника {user.surname} {user.name}? Вы сможете указать причину увольнения и другую информацию, которая поможет в дальнейшем анализе кадровых изменений.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Controller
              name="reason"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="reason">
                    Укажите причину (необязательно)
                  </FieldLabel>
                  <Input
                    {...field}
                    id="reason"
                    type="text"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
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
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && <Spinner />}
              Уволить
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export { UserFireDialog };
