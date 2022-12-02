import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { AppBar } from './AppBar';

const Story: ComponentMeta<typeof AppBar> = {
  component: AppBar,
  decorators: [
    (story) => (
      <IntlProvider defaultLocale="en" messages={{}} locale="en">
        {story()}
      </IntlProvider>
    ),
  ],
  args: {
    appName: 'Gift Coach',
  },
};
export default Story;

const Template: ComponentStory<typeof AppBar> = (args) => <AppBar {...args} />;

export const Primary = Template.bind({});
