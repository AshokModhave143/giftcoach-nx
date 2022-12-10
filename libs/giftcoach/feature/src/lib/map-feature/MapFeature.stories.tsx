import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MapFeature } from './MapFeature';
import { museums, center, zoom } from '@giftcoach/ui';

const Story: ComponentMeta<typeof MapFeature> = {
  component: MapFeature,
  args: {
    museums,
    center,
    zoom,
  },
};
export default Story;

const Template: ComponentStory<typeof MapFeature> = (args) => (
  <MapFeature {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
