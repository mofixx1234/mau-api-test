import { z } from 'zod';

export const organisationStatusSchema = z.enum(['active', 'inactive']);

export const createOrganisationSchema = z.object({
  name: z.string().trim().min(2, 'Name must contain at least 2 characters'),
  email: z.string().trim().email('Email must be valid').toLowerCase(),
  phone: z.string().trim().min(6, 'Phone must contain at least 6 characters').optional(),
  website: z.string().trim().url('Website must be a valid URL').optional(),
  status: organisationStatusSchema.default('active'),
});

export type CreateOrganisationDto = z.infer<typeof createOrganisationSchema>;
