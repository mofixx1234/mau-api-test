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
    `${serviceName} is running correctly.`,
    `Status: ${colorize('OK', colors.green, useColor)}`,
    `URL: ${colorize(healthUrl, colors.cyan, useColor)}`,
  ].join('\n');
};
