import cors from 'cors';
import express, { Express, Router } from 'express';
import morgan from 'morgan';

import { errorHandler } from '../common/middlewares/error.middleware';
import { notFoundHandler } from '../common/middlewares/not-found.middleware';
import { Module } from '../common/types/module';
import { joinPaths } from './path';

export class ApplicationFactory {
  static create(rootModule: Module): Express {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(morgan('dev'));

    this.registerModule(app, rootModule);

    app.use(notFoundHandler);
    app.use(errorHandler);

    return app;
  }

  private static registerModule(app: Express, module: Module, basePath = ''): void {
    const modulePath = joinPaths(basePath, module.path);

    module.imports?.forEach((childModule) => {
      this.registerModule(app, childModule, modulePath);
    });

    module.controllers?.forEach((controller) => {
      const router = Router();
      controller.registerRoutes(router);
      app.use(joinPaths(modulePath, controller.path), router);
    });
  }
}
