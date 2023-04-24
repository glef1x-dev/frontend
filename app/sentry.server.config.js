import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://81469621633b4608bef9c6f41df3596f@o1430642.ingest.sentry.io/4505069464911872",
  tracesSampleRate: 1.0,
});
