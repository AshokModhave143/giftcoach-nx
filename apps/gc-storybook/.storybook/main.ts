import { mergeConfig, UserConfig } from 'vite';
import { ViteFinal } from '@storybook/builder-vite';
import { StorybookConfig as StorybookBaseConfig } from '@storybook/core-common';
import {
  getAliasesForMonorepoPackages,
  getStoriesConfigForMonorepoPackages,
} from './util';

type StorybookConfig = StorybookBaseConfig & {
  viteFinal?: ViteFinal;
};
const monorepoPackages = ['@giftcoach/ui', '@giftcoach/feature'];

const stories = getStoriesConfigForMonorepoPackages(monorepoPackages);

const storybookConfig: StorybookConfig = {
  core: { builder: '@storybook/builder-vite', disableTelemetry: true },
  staticDirs: ['../../../public'],
  stories: [...stories],
  addons: [
    '@nrwl/react/plugins/storybook',
    '@storybook/addon-essentials',
    'storybook-react-intl',
    'storybook-addon-next-router',
    '@storybook/addon-interactions',
  ],
  features: {
    babelModeV7: true,
    storyStoreV7: true,
    buildStoriesJson: true,
  },
  viteFinal: async (config: UserConfig, { configType }) => {
    const extendedConfig: UserConfig = {
      define: {
        'process.env': process.env,
        global: 'window',
      },
      resolve: {
        alias: {
          'next/future/image': require.resolve(
            './__mocks__/NextJSImageMock.tsx'
          ),
          ...(configType === 'DEVELOPMENT'
            ? getAliasesForMonorepoPackages(monorepoPackages)
            : {}),
        },
      },
      build: {
        sourcemap: configType === 'DEVELOPMENT',
      },
    };

    const mergedConfig = mergeConfig(config, extendedConfig) as UserConfig;

    delete mergedConfig.optimizeDeps;

    return mergedConfig;
  },
};

export default storybookConfig;
