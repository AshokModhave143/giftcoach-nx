import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { AppBar } from './AppBar';

const Story: ComponentMeta<typeof AppBar> = {
  component: AppBar,
  args: {
    appName: 'Gift Coach',
  },
};
export default Story;

const Template: ComponentStory<typeof AppBar> = (args) => <AppBar {...args} />;

export const Primary = Template.bind({});
