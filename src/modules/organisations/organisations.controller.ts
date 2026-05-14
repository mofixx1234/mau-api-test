import { Request, RequestHandler, Router } from 'express';

import { Controller } from '../../common/types/controller';
import { validateBody } from '../../common/validators/validate-body';
import { createOrganisationSchema } from './dto/create-organisation.dto';
import { updateOrganisationSchema } from './dto/update-organisation.dto';
import { OrganisationsService } from './organisations.service';

export class OrganisationsController implements Controller {
  readonly path = '/organisations';

  constructor(private readonly organisationsService: OrganisationsService) {}

  registerRoutes(router: Router): void {
    router.get('/', this.findAll);
    router.get('/:id', this.findOne);
    router.post('/', validateBody(createOrganisationSchema), this.create);
    router.patch('/:id', validateBody(updateOrganisationSchema), this.update);
    router.delete('/:id', this.remove);
  }

  private readonly findAll: RequestHandler = (_request, response) => {
    response.json(this.organisationsService.findAll());
  };

  private readonly findOne: RequestHandler = (request, response) => {
    response.json(this.organisationsService.findOne(this.getIdParam(request)));
  };

  private readonly create: RequestHandler = (request, response) => {
    response.status(201).json(this.organisationsService.create(request.body));
  };

  private readonly update: RequestHandler = (request, response) => {
    response.json(this.organisationsService.update(this.getIdParam(request), request.body));
  };

  private readonly remove: RequestHandler = (request, response) => {
    this.organisationsService.remove(this.getIdParam(request));
    response.status(204).send();
  };

  private getIdParam(request: Request): string {
    const { id } = request.params;
    return Array.isArray(id) ? id[0] : id;
  }
}
