import dayjs from 'dayjs';
import z from 'zod';

const educationStoreSchema = z.object({
  userId: z.string('ID пользователя обязателен.'),
  institution: z
    .string('Учебное заведение должно быть строкой.')
    .nonempty('Учебное заведение обязателен.')
    .max(255, 'Учебное заведение должно быть не больше 255 символов.'),
  faculty: z
    .string('Факультет должен быть строкой.')
    .nonempty('Факультет обязателен.')
    .max(255, 'Факультет должен быть не больше 255 символов.'),
  speciality: z
    .string('Поле должен быть строкой.')
    .nonempty('Специальность обязателен.')
    .max(255, 'Специальность должен быть не больше 255 символов.'),
  form: z
    .string('Поле должен быть строкой.')
    .nonempty('Форма обучения обязателен.')
    .max(255, 'Форма обучения должен быть не больше 255 символов.'),
  startedAt: z
    .string('Дата поступления должно быть строкой.')
    .nonempty('Дата поступления обязателен.')
    .refine(
      (date) => !date || dayjs(date).isBefore(dayjs(), 'day'),
      'Дата поступления должна быть в прошлом.',
    ),
  endedAt: z
    .string('Дата окончания должна быть строкой.')
    .nonempty('Дата окончания обязателен.')
    .refine(
      (date) => !date || dayjs(date).isBefore(dayjs(), 'day'),
      'Дата окончания должна быть в прошлом.',
    ),
});

type EducationStoreSchema = z.infer<typeof educationStoreSchema>;

export {
  educationStoreSchema,
  type EducationStoreSchema,
};
