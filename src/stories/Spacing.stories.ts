import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Spacing from '@components/Spacing.vue';

const meta = {
  title: 'Layout/Spacing',
  component: Spacing,
  tags: ['autodocs'],
  argTypes: {
    m: { control: 'text' },
    p: { control: 'text' },
    display: { control: 'text' },
  },
  args: {
    p: 12,
    m: 8,
    display: 'block',
  },
} satisfies Meta<typeof Spacing>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    p: 12,
    m: 8,
    display: 'block',
  },
};
