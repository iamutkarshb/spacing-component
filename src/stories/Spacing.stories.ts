import Spacing from '@/components/Spacing.vue';
import type { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'Components/Spacing',
  component: Spacing,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'object',
      description:
        'Object with margin and padding. Example: { margin: { top: "12px", bottom: "auto", right: "auto", left: "auto" }, padding: { top: "12%", bottom: "12%", right: "12%", left: "12%" } }',
    },
  },
} as Meta<typeof Spacing>;

const Template: StoryFn<typeof Spacing> = (args) => ({
  components: { Spacing },
  setup() {
    return { args };
  },
  template: `
    <div style="display: flex; justify-content: center">
      <Spacing v-bind="args" style="max-width: 90%" />
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  value: {
    margin: {
      top: '12px',
      bottom: 'auto',
      right: 'auto',
      left: 'auto',
    },
    padding: {
      top: '12%',
      bottom: '12%',
      right: '12%',
      left: '12%',
    },
  },
  defaultValue: 'auto',
};
