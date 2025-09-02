import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
    '@storybook/addon-controls',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },

  async viteFinal(viteConfig) {
    viteConfig.base = '/spacing-component/';
    return viteConfig;
  },
};

export default config;
