/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('next').NextConfig} */

const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  output: "standalone",
  images: {
    // domains: ["id-cgk-1.linodeobjects.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Wildcard to allow all domains
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "9000",
        pathname: "/bucket1/**",
      },
    ],
  },
  webpack: (config) => {
    /** @type {import('webpack').Configuration} */
    const c = config;
    c.plugins = c.plugins || [];
    c.plugins.push(
      require("unplugin-auto-import/webpack").default({
        imports: [
          "react",
          "react-i18next",
          {
            "next/navigation": [
              "usePathname",
              "useSearchParams",
              "useSearchParamsState",
              "navigate",
            ],
          },
        ],
        dirs: [
          "./src/common/**/*",
          "./src/hooks/**/*",
          "./src/components/**/*",
        ],
        eslintrc: {
          enabled: true,
        },
        dts: "./auto-imports.d.ts",
        include: [/\.ts$/, /\.tsx$/],
      }),
    );
    return c;
  },
};

module.exports = withNextIntl(nextConfig);
