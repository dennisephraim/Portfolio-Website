// next.config.ts
import type { NextConfig } from 'next';
import type { webpack } from 'next/dist/compiled/webpack/webpack';
const nextConfig: NextConfig = {
  reactStrictMode: true,

  /**
   * Extend the default Webpack pipeline so `.svg` files that are
   * *imported from a JS/TS file* are transformed into React components.
   */
  webpack(config: webpack.Configuration) {
    // 1 – Tell the existing asset loader to ignore *.svg
    const assetRule = config.module!.rules.find(
    (rule: { test: { test: (arg0: string) => any; }; }) =>
      typeof rule === 'object' &&
      rule.test instanceof RegExp &&
      rule.test.test('.svg'),
  );
  if (assetRule) assetRule.resourceQuery = /url/;

  // Bare *.svg imports become React components
  config.module!.rules.push({
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    resourceQuery: { not: [/url/] },
    use: ['@svgr/webpack'],
  });
  return config;
  },
};

export default nextConfig;
