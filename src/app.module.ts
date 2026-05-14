import { Module } from './common/types/module';
import { HealthModule } from './modules/health/health.module';
import { InvoicesModule } from './modules/invoices/invoices.module';
import { UsersModule } from './modules/users/users.module';

export class AppModule implements Module {
  readonly path = '/api';

  readonly imports = [
    new HealthModule(),
    new InvoicesModule(),
    new UsersModule(),
  ];
}
