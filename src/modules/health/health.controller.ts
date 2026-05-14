import { RequestHandler, Router } from 'express';

import { Controller } from '../../common/types/controller';
import { renderHealthPage } from './templates/health-page.template';

export class HealthController implements Controller {
  readonly path = '/health';

  registerRoutes(router: Router): void {
    router.get('/', this.renderPage);
    router.get('/status', this.check);
  }

  private readonly renderPage: RequestHandler = (_request, response) => {
    response.type('html').send(renderHealthPage(this.getStatus()));
  };

  private readonly check: RequestHandler = (_request, response) => {
    response.json(this.getStatus());
  };

  private getStatus() {
    return {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      service: 'Express TypeScript API',
      environment: process.env.NODE_ENV ?? 'development',
    };
  }
}
