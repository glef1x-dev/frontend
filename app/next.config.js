const WindiCSS = require("windicss-webpack-plugin");
const { withAxiom } = require("next-axiom");

const ContentSecurityPolicy = `
  child-src *.google.com streamable.com;
  connect-src *;
  default-src 'self';
  font-src 'self';
  img-src * blob: data:;
  media-src 'none';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' cdn.splitbee.io;
  style-src 'self' 'unsafe-inline' *.googleapis.com;
  worker-src 'self' 'unsafe-inline' blob:;
`;

/**
 * @type {import("next").NextConfig}
 */
const config = {
  images: {
    domains: [
      // Discord assets
      "cdn.discordapp.com",

      // GitHub assets
      "raw.githubusercontent.com",

      // Spotify Album Art
      "i.scdn.co",

      // Streamable thumbnails
      "cdn-cf-east.streamable.com",

      // Unsplash
      "source.unsplash.com",
      "images.unsplash.com",
      "dyzdj8dlifcx0.cloudfront.net",
    ],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
      },
    ],
  },
  // Inspired by: https://github.com/leerob/leerob.io/blob/main/next.config.js#L44-L81
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
          {
            key: "Content-Security-Policy",
            value: ContentSecurityPolicy.replace(/\n/g, ""),
          },
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
          // Opt-out of Google FLoC: https://amifloced.org/
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },
  trailingSlash: true,
  swcMinify: true,
  webpack: (config, { dev, isServer }) => {
    config.plugins.push(new WindiCSS());

    config.module.rules.push({
      test: /\.(glsl|vs|fs|frag|vert)$/,
      use: ["ts-shader-loader"],
    });

    return config;
  },
};

module.exports = withAxiom(config);
