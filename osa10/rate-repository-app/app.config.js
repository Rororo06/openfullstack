import 'dotenv/config';

export default {
  name: 'rate-repository-app',
  slug: 'rate-repository-app',
  version: '1.0.0',
  orientation: 'portrait',
  userInterfaceStyle: 'light',
  assetBundlePatterns: ['**/*'],
  ios: { supportsTablet: true },
  android: {},
  web: { bundler: 'metro' },
  extra: {
    apolloUri: process.env.APOLLO_URI ?? 'http://localhost:4000/graphql',
  },
};
