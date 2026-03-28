import { cn } from '@/shared/lib';
import {
  Button,
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  Input
} from '@/shared/ui';
import { ComponentProps } from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/shared/assets/logo.svg';

function LoginForm({
  className,
  ...props
}: ComponentProps<'div'>) {
  return (
    <div className={cn('flex flex-col gap-6 mb-[10vh]', className)} {...props}>
      <form>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex flex-col items-center gap-2 font-medium">
              <div className="flex items-center justify-center rounded-md">
                <img className="flex w-40 h-auto" src={Logo} width={120} height={30} alt="Evolet Healthcare" />
              </div>
            </div>

            <h1 className="text-xl font-bold mb-4 mt-2">Добро пожаловать в Evolet</h1>

            <FieldDescription>
              Введите свои учетные данные
            </FieldDescription>
          </div>

          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="user123@example.com"
              required
            />
          </Field>

          <Field>
            <div className="flex items-center">
              <FieldLabel htmlFor="password">Пароль</FieldLabel>
              <Link to="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                Забыли пароль?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              required
            />
          </Field>

          <Field>
            <Button type="submit">Login</Button>
          </Field>
        </FieldGroup>
      </form>
    </div >
  );
}

export { LoginForm };
