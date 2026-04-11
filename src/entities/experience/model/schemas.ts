import dayjs from 'dayjs';
import z from 'zod';

const experienceStoreSchema = z.object({
  userId: z.string('ID пользователя обязателен.'),
  companyName: z
    .string('Название организации должно быть строкой.')
    .nonempty('Название организации обязателен.')
    .max(255, 'Название организации должно быть не больше 255 символов.'),
  position: z
    .string('Должность должно быть строкой.')
    .nonempty('Должность обязателен.')
    .max(255, 'Должность должно быть не больше 255 символов.'),
  startedAt: z
    .string('Дата начало работы должно быть строкой.')
    .nonempty('Дата начало работы обязателен.')
    .refine(
      (date) => !date || dayjs(date).isBefore(dayjs(), 'day'),
      'Дата начало работы должна быть в прошлом.',
    ),
  endedAt: z
    .string('Дата уволнения должна быть строкой.')
    .nonempty('Дата уволнения обязателен.')
    .refine(
      (date) => !date || dayjs(date).isBefore(dayjs(), 'day'),
      'Дата уволнения должна быть в прошлом.',
    ),
});

type ExperienceStoreSchema = z.infer<typeof experienceStoreSchema>;

export {
  experienceStoreSchema,
  type ExperienceStoreSchema,
};
