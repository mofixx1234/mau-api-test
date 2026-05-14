import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().trim().min(2, 'Name must contain at least 2 characters'),
  email: z.string().trim().email('Email must be valid').toLowerCase(),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
