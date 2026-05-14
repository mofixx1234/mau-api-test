import { Module } from '../../common/types/module';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';

export class InvoicesModule implements Module {
  private readonly invoicesService = new InvoicesService();

  readonly controllers = [
    new InvoicesController(this.invoicesService),
  ];
}
