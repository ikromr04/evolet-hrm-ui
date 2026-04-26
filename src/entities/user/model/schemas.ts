import z from 'zod';

const userStoreSchema = z.object({
  name: z
    .string('Поле должен быть строкой.')
    .nonempty('Обязательное поле.')
    .max(255, 'Поле должен быть не больше 255 символов.'),
  surname: z
    .string('Поле должен быть строкой.')
    .nonempty('Обязательное поле.')
    .max(255, 'Поле должен быть не больше 255 символов.'),
  patronymic: z
    .string('Поле должен быть строкой.')
    .max(255, 'Поле должен быть не больше 255 символов.')
    .optional(),
  email: z
    .email('Неверный адрес электронной почты.')
    .nonempty('Обязательное поле.')
    .max(255, 'Поле должен быть не больше 255 символов.'),
});

type UserStoreSchema = z.infer<typeof userStoreSchema>;

const userUpdateSchema = z.object({
  id: z.string('ID пользователя обязателен.'),
  name: z
    .string('Имя должен быть строкой.')
    .trim()
    .min(1, 'Имя обязательно.')
    .max(255, 'Имя должно быть не больше 255 символов.')
    .optional(),
  surname: z
    .string('Фамилия должен быть строкой.')
    .min(1, 'Фамилия обязательно.')
    .max(255, 'Фамилия должно быть не больше 255 символов.')
    .optional(),
  patronymic: z
    .string('Отчество должен быть строкой.')
    .max(255, 'Отчество должно быть не больше 255 символов.')
    .optional(),
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
    .optional(),
  email: z
    .string('Email должен быть строкой.')
    .trim()
    .min(1, 'Email обязателен.')
    .email('Неверный адрес электронной почты.')
    .max(255, 'Email не должен превышать 255 символов.')
    .optional(),
  roles: z
    .array(
      z.string('ID должен быть строкой.')
    )
    .optional(),
  positions: z
    .array(
      z.string('ID должен быть строкой.')
    )
    .optional(),
  departments: z
    .array(
      z.string('ID должен быть строкой.')
    )
    .optional(),
  languages: z
    .array(
      z.string('ID должен быть строкой.')
    )
    .optional(),
});

type UserUpdateSchema = z.infer<typeof userUpdateSchema>;

const userFireSchema = z.object({
  id: z.string('ID пользователя обязателен.'),
  reason: z
    .string('Поле должен быть строкой.')
    .optional(),
});

type UserFireSchema = z.infer<typeof userFireSchema>;

const userTransferSchema = z.object({
  id: z.string('ID пользователя обязателен.'),
  to: z
    .string('Поле должен быть строкой.')
    .optional(),
});

type UserTransferSchema = z.infer<typeof userTransferSchema>;

export {
  userStoreSchema,
  userUpdateSchema,
  userFireSchema,
  userTransferSchema,
  type UserStoreSchema,
  type UserUpdateSchema,
  type UserFireSchema,
  type UserTransferSchema,
};
