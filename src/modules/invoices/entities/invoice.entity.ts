import { z } from 'zod';

import { invoiceStatusSchema } from '../dto/create-invoice.dto';

export type InvoiceStatus = z.infer<typeof invoiceStatusSchema>;

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  amount: number;
  currency: string;
  status: InvoiceStatus;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}
