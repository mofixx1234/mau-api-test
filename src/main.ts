import 'dotenv/config';

import { AppModule } from './app.module';
import { env } from './config/env';
import { ApplicationFactory } from './core/application.factory';
import { renderStartupBanner } from './core/startup-banner';

const app = ApplicationFactory.create(new AppModule());

const server = app.listen(env.port, () => {
  console.log(renderStartupBanner({
    port: env.port,
    serviceName: 'Express TypeScript API',
    useColor: Boolean(process.stdout.isTTY) && !process.env.NO_COLOR,
  }));
});

const shutdown = (signal: NodeJS.Signals): void => {
  console.log(`\n${signal} received. Closing server...`);
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
