import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { GoogleMapReact } from './GoogleMapReact';
import { center, zoom, museums, MuseumData } from './data';
import { CustomMarker } from './components';

const Story: ComponentMeta<typeof GoogleMapReact> = {
  component: GoogleMapReact,
  args: {
    center: center,
    zoom: zoom,
  },
};
export default Story;

const Template: ComponentStory<typeof GoogleMapReact> = (args) => (
  <GoogleMapReact {...args}>
    {museums.map((marker: MuseumData) => (
      <CustomMarker
        key={marker.name}
        position={marker.position}
        onClick={() => alert('clicked')}
        onDragStart={() => console.log('drag start')}
      />
    ))}
  </GoogleMapReact>
);

export const Primary = Template.bind({});
Primary.args = {};
