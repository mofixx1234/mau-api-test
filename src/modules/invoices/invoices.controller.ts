import { Request, RequestHandler, Router } from 'express';

import { Controller } from '../../common/types/controller';
import { validateBody } from '../../common/validators/validate-body';
import { createInvoiceSchema } from './dto/create-invoice.dto';
import { updateInvoiceSchema } from './dto/update-invoice.dto';
import { InvoicesService } from './invoices.service';

export class InvoicesController implements Controller {
  readonly path = '/invoices';

  constructor(private readonly invoicesService: InvoicesService) {}

  registerRoutes(router: Router): void {
    router.get('/', this.findAll);
    router.get('/:id', this.findOne);
    router.post('/', validateBody(createInvoiceSchema), this.create);
    router.patch('/:id', validateBody(updateInvoiceSchema), this.update);
    router.delete('/:id', this.remove);
  }

  private readonly findAll: RequestHandler = (_request, response) => {
    response.json(this.invoicesService.findAll());
  };

  private readonly findOne: RequestHandler = (request, response) => {
    response.json(this.invoicesService.findOne(this.getIdParam(request)));
  };

  private readonly create: RequestHandler = (request, response) => {
    response.status(201).json(this.invoicesService.create(request.body));
  };

  private readonly update: RequestHandler = (request, response) => {
    response.json(this.invoicesService.update(this.getIdParam(request), request.body));
  };

  private readonly remove: RequestHandler = (request, response) => {
    this.invoicesService.remove(this.getIdParam(request));
    response.status(204).send();
  };

  private getIdParam(request: Request): string {
    const { id } = request.params;
    return Array.isArray(id) ? id[0] : id;
  }
}
