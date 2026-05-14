import { Request, RequestHandler, Router } from 'express';

import { validateBody } from '../../common/validators/validate-body';
import { Controller } from '../../common/types/controller';
import { createUserSchema } from './dto/create-user.dto';
import { updateUserSchema } from './dto/update-user.dto';
import { UsersService } from './users.service';

export class UsersController implements Controller {
  readonly path = '/users';

  constructor(private readonly usersService: UsersService) {}

  registerRoutes(router: Router): void {
    router.get('/', this.findAll);
    router.get('/:id', this.findOne);
    router.post('/', validateBody(createUserSchema), this.create);
    router.patch('/:id', validateBody(updateUserSchema), this.update);
    router.delete('/:id', this.remove);
  }

  private readonly findAll: RequestHandler = (_request, response) => {
    response.json(this.usersService.findAll());
  };

  private readonly findOne: RequestHandler = (request, response) => {
    response.json(this.usersService.findOne(this.getIdParam(request)));
  };

  private readonly create: RequestHandler = (request, response) => {
    response.status(201).json(this.usersService.create(request.body));
  };

  private readonly update: RequestHandler = (request, response) => {
    response.json(this.usersService.update(this.getIdParam(request), request.body));
  };

  private readonly remove: RequestHandler = (request, response) => {
    this.usersService.remove(this.getIdParam(request));
    response.status(204).send();
  };

  private getIdParam(request: Request): string {
    const { id } = request.params;
    return Array.isArray(id) ? id[0] : id;
  }
}
