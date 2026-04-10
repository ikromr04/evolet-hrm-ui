import z from 'zod';

const equipmentStoreSchema = z.object({
  userId: z.string('ID пользователя обязателен.'),
  name: z
    .string('Название должно быть строкой.')
    .nonempty('Название обязателен.')
    .max(255, 'Название должно быть не больше 255 символов.'),
  description: z
    .string('Описание должен быть строкой.')
    .max(255, 'Описание должно быть не больше 255 символов.')
    .optional(),
});

type EquipmentStoreSchema = z.infer<typeof equipmentStoreSchema>;

export {
  equipmentStoreSchema,
  type EquipmentStoreSchema,
};
