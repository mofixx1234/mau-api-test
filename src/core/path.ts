export const joinPaths = (...parts: Array<string | undefined>): string => {
  const cleanedParts = parts
    .filter((part): part is string => Boolean(part))
    .map((part) => part.replace(/^\/+|\/+$/g, ''))
    .filter(Boolean);

  return `/${cleanedParts.join('/')}`;
};
