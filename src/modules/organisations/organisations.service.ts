import { randomUUID } from 'node:crypto';

import { ConflictException, NotFoundException } from '../../common/errors/http.exception';
import { CreateOrganisationDto } from './dto/create-organisation.dto';
import { UpdateOrganisationDto } from './dto/update-organisation.dto';
import { Organisation } from './entities/organisation.entity';

export class OrganisationsService {
  private readonly organisations: Organisation[] = [
    {
      id: randomUUID(),
      name: 'Acme Corporation',
      email: 'contact@acme.example',
      phone: '+1555010000',
      website: 'https://acme.example',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  findAll(): Organisation[] {
    return this.organisations;
  }

  findOne(id: string): Organisation {
    const organisation = this.organisations.find(
      (currentOrganisation) => currentOrganisation.id === id,
    );

    if (!organisation) {
      throw new NotFoundException(`Organisation ${id} not found`);
    }

    return organisation;
  }

  create(payload: CreateOrganisationDto): Organisation {
    this.assertEmailIsAvailable(payload.email);

    const now = new Date().toISOString();
    const organisation: Organisation = {
      id: randomUUID(),
      ...payload,
      createdAt: now,
      updatedAt: now,
    };

    this.organisations.push(organisation);
    return organisation;
  }

  update(id: string, payload: UpdateOrganisationDto): Organisation {
    const organisation = this.findOne(id);

    if (payload.email && payload.email !== organisation.email) {
      this.assertEmailIsAvailable(payload.email);
    }

    Object.assign(organisation, payload, {
      updatedAt: new Date().toISOString(),
    });

    return organisation;
  }

  remove(id: string): void {
    const organisationIndex = this.organisations.findIndex(
      (organisation) => organisation.id === id,
    );

    if (organisationIndex === -1) {
      throw new NotFoundException(`Organisation ${id} not found`);
    }

    this.organisations.splice(organisationIndex, 1);
  }

  private assertEmailIsAvailable(email: string): void {
    const emailAlreadyExists = this.organisations.some(
      (organisation) => organisation.email === email,
    );

    if (emailAlreadyExists) {
      throw new ConflictException(`Email ${email} is already used`);
    }
  }
}
