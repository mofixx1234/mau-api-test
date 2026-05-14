import { z } from 'zod';

import { createInvoiceSchema } from './create-invoice.dto';

export const updateInvoiceSchema = createInvoiceSchema
  .partial()
  .refine((value) => Object.keys(value).length > 0, {
    message: 'At least one field must be provided',
  });

export type UpdateInvoiceDto = z.infer<typeof updateInvoiceSchema>;
