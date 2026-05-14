import { Module } from '../../common/types/module';
import { HealthController } from './health.controller';

export class HealthModule implements Module {
  readonly controllers = [
    new HealthController(),
  ];
}
