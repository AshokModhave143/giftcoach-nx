import { StorybookConfig, Options, mergeConfigs } from '@storybook/core-common';
import path from 'path';
import {
  getAliasesForMonorepoPackages,
  getStoriesConfigForMonorepoPackages,
} from './util';

const monorepoPackages = ['@giftcoach/ui', '@giftcoach/feature'];

const stories = getStoriesConfigForMonorepoPackages(monorepoPackages);

const storybookConfig: StorybookConfig = {
  core: { builder: 'webpack5', disableTelemetry: true },
  staticDirs: ['../../../public'],
  stories: [...stories],
  addons: [
    '@nrwl/react/plugins/storybook',
    '@storybook/addon-essentials',
    'storybook-react-intl',
    'storybook-addon-next-router',
  ],
  features: {
    babelModeV7: true,
    storyStoreV7: true,
    buildStoriesJson: true,
  },
  webpackFinal: async (config, { configType }: Options) => {
    const extendedConfig = {
      resolve: {
        alias: {
          ...(configType === 'DEVELOPMENT'
            ? getAliasesForMonorepoPackages(monorepoPackages)
            : {}),
        },
      },
      devtool: 'source-map',
    };

    const mergedConfig = mergeConfigs(config, extendedConfig);

    return mergedConfig;
  },
};

export default storybookConfig;
