import { BaseSyntheticEvent, ComponentProps } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginAction, loginSchema, LoginSchema } from '@/entities/user';
import { cn } from '@/shared/lib';
import { useAppDispatch } from '@/shared/store';
import { ApiErrors } from '@/shared/api';
import { toast } from 'sonner';
import {
  Button,
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  Input,
  Logo,
  Spinner
} from '@/shared/ui';

function LoginForm({
  className,
  ...props
}: ComponentProps<'div'>) {
  const dispatch = useAppDispatch();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (credentials: LoginSchema, evt?: BaseSyntheticEvent) => {
    evt?.preventDefault();

    await dispatch(loginAction(credentials))
      .unwrap()
      .catch((errors: ApiErrors) => {
        errors.forEach((error) => {
          if (error.source?.pointer) {
            form.setError(error.source.pointer.split('/').pop() as keyof LoginSchema, {
              message: error.detail
            });
          } else {
            toast.error(error.detail);
          }
        });
      });
  };

  return (
    <div className={cn('flex flex-col gap-6 mb-[10vh]', className)} {...props}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex flex-col items-center gap-2 font-medium">
              <div className="flex items-center justify-center rounded-md">
                <Logo />
              </div>
            </div>

            <h1 className="text-xl font-bold mb-4 mt-2">Добро пожаловать в Evolet</h1>

            <FieldDescription>
              Введите свои учетные данные
            </FieldDescription>
          </div>

          <Controller
            name="email"
            control={form.control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <Field>
                <label className="sr-only" htmlFor="email">
                  Email
                </label>
                <Input
                  {...field}
                  id="email"
                  type="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="Email"
                  autoComplete="off"
                  required
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <Field>
                <label className="sr-only" htmlFor="password">
                  Пароль
                </label>
                <Input
                  {...field}
                  id="password"
                  type="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Пароль"
                  autoComplete="off"
                  required
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <Field>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && <Spinner />}
              Войти
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div >
  );
}

export { LoginForm };
