export const assertNever = (v: never): never => {
  throw new Error(`Unhandled course part: ${JSON.stringify(v)}`);
};
