import type { Meta, StoryObj } from '@storybook/react';

import AnimatedPoints from './AnimatedPoints';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Graphics/AnimatedPoints',
  component: AnimatedPoints,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    basePointSize: { control: { type: 'range', min:0, max:240, step: 4 } },
    pointMaxSize: { control: { type: 'range', min:0, max:240, step: 4 } },
    distanceBetweenPoints: { control: { type: 'range', min:0, max:240, step: 4 } },
    hoverRadius: { control: { type: 'range', min:0, max:240, step: 4 } },
    padding: { control: { type: 'range', min:0, max:240, step: 4 } },
    defaultColor: { control: 'color' },
    hoverColor: { control: 'color' },
    isHoverEffect: { control: 'boolean' },
    isColorChange: { control: 'boolean' },
    isSizeChange: { control: 'boolean' },
    isGradientAnimation: { control: 'boolean' },
  },
} satisfies Meta<typeof AnimatedPoints>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
    args: {},
};