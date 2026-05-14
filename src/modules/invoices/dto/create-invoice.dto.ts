import { z } from 'zod';

export const invoiceStatusSchema = z.enum(['draft', 'sent', 'paid', 'canceled']);

export const createInvoiceSchema = z.object({
  invoiceNumber: z.string().trim().min(3, 'Invoice number must contain at least 3 characters'),
  customerName: z.string().trim().min(2, 'Customer name must contain at least 2 characters'),
  amount: z.number().positive('Amount must be greater than 0'),
  currency: z.string().trim().length(3, 'Currency must use a 3-letter ISO code').toUpperCase(),
  status: invoiceStatusSchema.default('draft'),
  dueDate: z.string().trim().date('Due date must use YYYY-MM-DD format'),
});

export type CreateInvoiceDto = z.infer<typeof createInvoiceSchema>;
