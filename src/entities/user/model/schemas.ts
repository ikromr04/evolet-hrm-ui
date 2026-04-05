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
    .max(50, 'Имя должно быть не больше 50 символов.'),
  surname: z
    .string('Фамилия должен быть строкой.')
    .nonempty('Фамилия обязателен.')
    .max(50, 'Фамилия должно быть не больше 50 символов.'),
  patronymic: z
    .string('Пароль должен быть строкой.')
    .max(50, 'Отчество должно быть не больше 50 символов.')
    .optional(),
  email: z
    .string('Пароль должен быть строкой.')
    .nonempty('Пароль обязателен.')
    .email('Неверный адрес электронной почты.')
    .max(150, 'Email не должно превышать 150 символов.'),
});

type UserStoreSchema = z.infer<typeof userStoreSchema>;

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_AVATAR_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const avatarUploadSchema = z.object({
  image: z
    .any()
    .refine(
      (file) => !file || file instanceof File,
      'Файл должен быть изображением.'
    )
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      'Максимальный размер файла 2Мб.'
    )
    .refine(
      (file) => !file || ACCEPTED_AVATAR_TYPES.includes(file.type),
      'Только JPG, PNG или WEBP.'
    )
});

type AvatarUploadSchema = z.infer<typeof avatarUploadSchema>;

export {
  loginSchema,
  userStoreSchema,
  avatarUploadSchema,
  type LoginSchema,
  type UserStoreSchema,
  type AvatarUploadSchema,
};
