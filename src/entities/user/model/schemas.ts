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

const userStoreSchema = z.object({
  name: z
    .string('Имя должен быть строкой.')
    .nonempty('Имя обязателен.')
    .max(255, 'Имя должно быть не больше 255 символов.'),
  surname: z
    .string('Фамилия должен быть строкой.')
    .nonempty('Фамилия обязателен.')
    .max(255, 'Фамилия должно быть не больше 255 символов.'),
  patronymic: z
    .string('Отчество должен быть строкой.')
    .max(255, 'Отчество должно быть не больше 255 символов.')
    .optional(),
  email: z
    .string('Email должен быть строкой.')
    .nonempty('Email обязателен.')
    .email('Неверный адрес электронной почты.')
    .max(255, 'Email не должно превышать 255 символов.'),
  avatar: z
    .any()
    .refine(
      (file) => !file || file instanceof File,
      'Файл должен быть изображением.'
    )
    .refine(
      (file) => !file || file.size <= 2 * 1024 * 1024,
      'Максимальный размер файла 2Мб.'
    )
    .refine(
      (file) => !file || ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type),
      'Только JPG, PNG или WEBP.'
    )
    .optional()
});

type UserStoreSchema = z.infer<typeof userStoreSchema>;

export {
  loginSchema,
  userStoreSchema,
  type LoginSchema,
  type UserStoreSchema,
};
