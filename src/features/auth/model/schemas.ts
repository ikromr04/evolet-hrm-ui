import z from 'zod';

const loginSchema = z.object({
  email: z
    .string('Email должен быть строкой')
    .nonempty('Email обязателен.')
    .email('Неверный адрес электронной почты.')
    .max(150, 'Email не должно превышать 150 символов.'),
  password: z
    .string('Пароль должен быть строкой')
    .nonempty('Пароль обязателен.')
    .min(6, 'Пароль должен содержать не менее 6 символов.')
    .max(50, 'Пароль не должно превышать 50 символов.')
});

type LoginSchema = z.infer<typeof loginSchema>;

export {
  loginSchema,
  type LoginSchema,
};
