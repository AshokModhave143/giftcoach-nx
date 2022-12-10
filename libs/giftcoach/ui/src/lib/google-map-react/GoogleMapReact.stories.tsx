import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { GoogleMapReact } from './GoogleMapReact';
import { center, zoom, museums } from './data';

const Story: ComponentMeta<typeof GoogleMapReact> = {
  component: GoogleMapReact,
  args: {
    center: center,
    zoom: zoom,
    markers: museums,
  },
};
export default Story;

const Template: ComponentStory<typeof GoogleMapReact> = (args) => (
  <GoogleMapReact {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
