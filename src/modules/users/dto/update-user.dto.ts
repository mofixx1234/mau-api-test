import { z } from 'zod';

import { createUserSchema } from './create-user.dto';

export const updateUserSchema = createUserSchema
  .partial()
  .refine((value) => Object.keys(value).length > 0, {
    message: 'At least one field must be provided',
  });

export type UpdateUserDto = z.infer<typeof updateUserSchema>;
