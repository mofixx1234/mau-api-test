const parsePort = (value: string | undefined): number => {
  const port = Number(value ?? 6060);

  if (!Number.isInteger(port) || port <= 0) {
    throw new Error('PORT must be a positive integer');
  }

  return port;
};

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: parsePort(process.env.PORT),
};
