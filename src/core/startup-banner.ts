type StartupBannerOptions = {
  port: number;
  serviceName: string;
  healthPath?: string;
  host?: string;
  useColor?: boolean;
};

const colors = {
  cyan: '\u001b[36m',
  green: '\u001b[32m',
  reset: '\u001b[0m',
};

const logo = String.raw`   ___    ____  ____
  / _ |  / __ \/  _/
 / __ | / /_/ // /
/_/ |_|/ .___/___/
      /_/
`.trimEnd();

const colorize = (value: string, color: string, enabled: boolean): string => {
  return enabled ? `${color}${value}${colors.reset}` : value;
};

const description = [
  'This service exposes a modular Express API built with a NestJS-inspired',
  'architecture. Routes are grouped by feature modules, controllers handle',
  'HTTP entrypoints, services keep business logic isolated, and DTO schemas',
  'validate incoming payloads before they reach the application layer.',
  '',
  'The health page confirms that the server is reachable, while the JSON',
  'status endpoint can be used by CI, deployment probes, or monitoring tools.',
];

export const renderStartupBanner = ({
  port,
  serviceName,
  healthPath = '/api/health',
  host = 'localhost',
  useColor = true,
}: StartupBannerOptions): string => {
  const healthUrl = `http://${host}:${port}${healthPath}`;

  return [
    colorize(logo, colors.cyan, useColor),
    '',
    'Welcome!',
    '',
    ...description,
    '',
    `${serviceName} is running correctly.`,
    `Status: ${colorize('OK', colors.green, useColor)}`,
    `URL: ${colorize(healthUrl, colors.cyan, useColor)}`,
  ].join('\n');
};
