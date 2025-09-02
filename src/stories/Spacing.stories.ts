import Spacing, { SpacingProps, SpacingCustomItemProps } from '@/components/Spacing.vue';
import type { Meta, StoryFn } from '@storybook/vue3';
import { ref } from 'vue';

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
    defaultValue: {
      control: 'object',
      description: 'Default values for margin and padding if value is empty',
    },
    customOptions: {
      control: 'object',
      description: 'Array of custom dropdown options',
    },
    disableSuggestion: {
      control: 'object',
      description: 'Disable suggestions dropdown for margin and padding',
    },
    readOnlyFields: {
      control: 'object',
      description: 'Make the input-field read-only',
    },
  },
} as Meta<typeof Spacing>;

const Template: StoryFn<typeof Spacing> = (args: SpacingProps) => ({
  components: { Spacing },
  setup() {
    const updatedItem = ref<string | null>(null);

    const onUpdate = (item: string) => {
      updatedItem.value = item;
    };

    return { args, updatedItem, onUpdate };
  },
  template: `
    <div style="display: flex; flex-direction: column; align-items: center; gap: 20px;">
      <Spacing v-bind="args" style="max-width: 90%" @onUpdate="onUpdate" />
      <pre style="background: #f0f0f0; padding: 10px; border-radius: 4px; max-width: 600px; width: 100%; overflow-x: auto;">
{{ updatedItem ?? 'No update yet' }}
      </pre>
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
  defaultValue: {
    margin: '20px',
    padding: '20px',
  },
  disableSuggestion: {
    margin: false,
    padding: false,
  },
  readOnlyFields: {
    margin: {
      top: false,
      bottom: false,
      right: false,
      left: false,
    },
    padding: {
      top: false,
      bottom: false,
      right: false,
      left: false,
    },
  },
  customOptions: [
    { label: 'Apply Small (8px) to All', applyToAll: false, valueToApply: '8px' },
  ] as SpacingCustomItemProps[],
};
