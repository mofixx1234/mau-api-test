import { z } from 'zod';

import { organisationStatusSchema } from '../dto/create-organisation.dto';

export type OrganisationStatus = z.infer<typeof organisationStatusSchema>;

export interface Organisation {
  id: string;
  name: string;
  email: string;
  phone?: string;
  website?: string;
  status: OrganisationStatus;
  createdAt: string;
  updatedAt: string;
}
