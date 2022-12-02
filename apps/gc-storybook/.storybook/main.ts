import { mergeConfig, UserConfig } from 'vite';
import { ViteFinal } from '@storybook/builder-vite';
import { StorybookConfig as StorybookBaseConfig } from '@storybook/core-common';
import {
  getAliasesForMonorepoPackages,
  getStoriesConfigForMonorepoPackages,
} from './util';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import analyse from 'rollup-plugin-analyzer';

const monorepoPackages = ['@giftcoach/ui', '@giftcoach/feature'];

const stories = getStoriesConfigForMonorepoPackages(monorepoPackages);

const devMode = process.env.NODE_ENV === 'development';

function terserConfig() {
  return terser({
    ecma: 2020,
    mangle: { toplevel: true },
    compress: {
      module: true,
      toplevel: true,
      unsafe_arrows: true,
      drop_console: !devMode,
      drop_debugger: !devMode,
    },
    output: { quote_style: 1 },
  });
}

type StorybookConfig = StorybookBaseConfig & {
  viteFinal?: ViteFinal;
};

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
  framework: '@storybook/react',
  viteFinal: async (config: UserConfig, { configType }) => {
    const extendedConfig: UserConfig = {
      define: {
        'process.env': process.env,
        // global: 'Window',
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

        rollupOptions: {
          external: ['react', 'react-dom', 'window'],
          output: {
            globals: {
              react: 'React',
              window: 'window',
            },
            sourcemap: devMode ? 'inline' : false,
            plugins: [terserConfig()],
          },
          treeshake: {
            moduleSideEffects: false,
          },
          plugins: [
            nodeResolve(),
            analyse({ summaryOnly: true, filterSummary: true }),
          ],
        },
      },
    };

    const mergedConfig = mergeConfig(config, extendedConfig) as UserConfig;

    delete mergedConfig.optimizeDeps;

    return mergedConfig;
  },
};

export default storybookConfig;
