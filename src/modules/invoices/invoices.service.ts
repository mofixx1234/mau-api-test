import { randomUUID } from 'node:crypto';

import { ConflictException, NotFoundException } from '../../common/errors/http.exception';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Invoice } from './entities/invoice.entity';

export class InvoicesService {
  private readonly invoices: Invoice[] = [
    {
      id: randomUUID(),
      invoiceNumber: 'INV-2026-001',
      customerName: 'Ada Lovelace',
      amount: 1200,
      currency: 'USD',
      status: 'sent',
      dueDate: '2026-06-15',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  findAll(): Invoice[] {
    return this.invoices;
  }

  findOne(id: string): Invoice {
    const invoice = this.invoices.find((currentInvoice) => currentInvoice.id === id);

    if (!invoice) {
      throw new NotFoundException(`Invoice ${id} not found`);
    }

    return invoice;
  }

  create(payload: CreateInvoiceDto): Invoice {
    this.assertInvoiceNumberIsAvailable(payload.invoiceNumber);

    const now = new Date().toISOString();
    const invoice: Invoice = {
      id: randomUUID(),
      ...payload,
      createdAt: now,
      updatedAt: now,
    };

    this.invoices.push(invoice);
    return invoice;
  }

  update(id: string, payload: UpdateInvoiceDto): Invoice {
    const invoice = this.findOne(id);

    if (payload.invoiceNumber && payload.invoiceNumber !== invoice.invoiceNumber) {
      this.assertInvoiceNumberIsAvailable(payload.invoiceNumber);
    }

    Object.assign(invoice, payload, {
      updatedAt: new Date().toISOString(),
    });

    return invoice;
  }

  remove(id: string): void {
    const invoiceIndex = this.invoices.findIndex((invoice) => invoice.id === id);

    if (invoiceIndex === -1) {
      throw new NotFoundException(`Invoice ${id} not found`);
    }

    this.invoices.splice(invoiceIndex, 1);
  }

  private assertInvoiceNumberIsAvailable(invoiceNumber: string): void {
    const invoiceNumberAlreadyExists = this.invoices.some(
      (invoice) => invoice.invoiceNumber === invoiceNumber,
    );

    if (invoiceNumberAlreadyExists) {
      throw new ConflictException(`Invoice number ${invoiceNumber} is already used`);
    }
  }
}
