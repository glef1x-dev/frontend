export type EnvName = "development" | "production";
export type Config = {
  app: {
    env: EnvName;
    name?: string;
    baseAPIUrl: string;
  };
  utternances: {
    repositoryName: string;
  };
  sentry: {
    dsn?: string;
  };
};

export const config: Config = JSON.parse(import.meta.env.VITE_CONFIG);
