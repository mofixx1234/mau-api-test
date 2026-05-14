import { z } from 'zod';

import { createOrganisationSchema } from './create-organisation.dto';

export const updateOrganisationSchema = createOrganisationSchema
  .partial()
  .refine((value) => Object.keys(value).length > 0, {
    message: 'At least one field must be provided',
  });

export type UpdateOrganisationDto = z.infer<typeof updateOrganisationSchema>;
