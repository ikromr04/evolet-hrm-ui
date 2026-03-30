import z from 'zod';

const loginSchema = z.object({
  email: z.email('Неверный адрес электронной почты.'),
  password: z.string().min(6, 'Пароль должен содержать не менее 6 символов.')
});

type LoginSchema = z.infer<typeof loginSchema>;

export { loginSchema, type LoginSchema };
