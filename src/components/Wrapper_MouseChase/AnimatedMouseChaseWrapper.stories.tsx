import type { Meta, StoryObj } from '@storybook/react';

import AnimatedMouseChaseWrapper from './AnimatedMouseChaseWrapper';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Example/Wrapper_MouseChase',
  component: AnimatedMouseChaseWrapper,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    children: { control: 'text' },
    multiplier: { control: 'number', defaultValue: 5 },
    tension: { control: 'number', defaultValue: 120 },
    friction: { control: 'number', defaultValue: 140 },
  },
} satisfies Meta<typeof AnimatedMouseChaseWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
    args: {
      children: <button>Hello, World</button>
    },
};