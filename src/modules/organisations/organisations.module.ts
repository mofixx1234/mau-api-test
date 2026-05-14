import { Module } from '../../common/types/module';
import { OrganisationsController } from './organisations.controller';
import { OrganisationsService } from './organisations.service';

export class OrganisationsModule implements Module {
  private readonly organisationsService = new OrganisationsService();

  readonly controllers = [
    new OrganisationsController(this.organisationsService),
  ];
}
