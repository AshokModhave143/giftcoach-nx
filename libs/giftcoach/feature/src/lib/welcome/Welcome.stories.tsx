import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Welcome } from './Welcome';

const Story: ComponentMeta<typeof Welcome> = {
  component: Welcome,
};
export default Story;

const Template: ComponentStory<typeof Welcome> = (args) => (
  <Welcome {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
