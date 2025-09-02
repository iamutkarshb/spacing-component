export default {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
  ],
  framework: '@storybook/vue3-vite',
  core: {
    builder: '@storybook/builder-vite',
  },
  async viteFinal(config) {
    const { mergeConfig } = await import('vite');

    return mergeConfig(config, {
      base: '/spacing-component/',
      optimizeDeps: {
        include: ['storybook-dark-mode'],
      },
    });
  },
};
