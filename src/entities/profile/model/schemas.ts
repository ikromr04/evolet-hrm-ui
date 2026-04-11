import dayjs from 'dayjs';
import z from 'zod';

const profileStoreSchema = z.object({
  birthDate: z
    .string('Дата рождения работы должна быть строкой.')
    .optional()
    .refine(
      (date) => !date || dayjs(date).isBefore(dayjs(), 'day'),
      'Дата рождения должна быть в прошлом.',
    ),
  sex: z
    .string('Пол должно быть строкой.')
    .optional(),
  nationality: z
    .string('Национальность должна быть строкой.')
    .max(255, 'Национальность не должна превышать 255 символов.')
    .optional(),
  citizenship: z
    .string('Гражданство должно быть строкой.')
    .max(255, 'Гражданство не должно превышать 255 символов.')
    .optional(),
  address: z
    .string('Адрес должен быть строкой.')
    .max(255, 'Адрес не должен превышать 255 символов.')
    .optional(),
  tel1: z
    .string('Телефон 1 должен быть строкой.')
    .max(255, 'Телефон 1 не должен превышать 255 символов.')
    .optional(),
  tel2: z
    .string('Телефон 2 должен быть строкой.')
    .max(255, 'Телефон 2 не должен превышать 255 символов.')
    .optional(),
  familyStatus: z
    .string('Семейное положение должно быть строкой.')
    .max(255, 'Семейное положение не должно превышать 255 символов.')
    .optional(),
  children: z
    .array(
      z
        .number('Год рождения ребенка должен быть числом.')
        .int('Год рождения ребенка должен быть целым числом.')
        .gte(1900, 'Год рождения ребенка должен быть >= 1900.')
        .lte(dayjs().year(), 'Год рождения ребенка не может быть в будущем.')
    )
    .optional(),

  startedWorkAt: z
    .string('Дата начало работы должна быть строкой.')
    .optional()
    .refine(
      (date) => !date || dayjs(date).isBefore(dayjs().add(1, 'day'), 'day'),
      'Дата начало работы не может быть в будущем.'
    ),

  userId: z.string('ID пользователя обязателен.'),
});

type ProfileStoreSchema = z.infer<typeof profileStoreSchema>;

export {
  profileStoreSchema,
  type ProfileStoreSchema,
};
