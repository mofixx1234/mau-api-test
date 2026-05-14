import { Controller } from './controller';

export interface Module {
  readonly path?: string;
  readonly imports?: Module[];
  readonly controllers?: Controller[];
}
