import Input from '@/components/Input.vue';
import { ref, watch } from 'vue';
import type { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    title: { control: 'text' },
    placeholder: { control: 'text' },
    type: {
      control: { type: 'select' },
      options: ['text', 'number', 'email', 'password'],
    },
    modelValue: { control: 'text' },
    maxLength: { control: 'number' },
    readonly: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} as Meta<typeof Input>;

const Template: StoryFn<typeof Input> = (args) => {
  const value = ref(args.modelValue);
  const errorMsg = ref('');

  watch(
    () => args.modelValue,
    (newVal) => {
      value.value = newVal;
    }
  );

  const validateFn = (val: string) => {
    if (args.type === 'email') {
      return /\S+@\S+\.\S+/.test(val) || 'Invalid email address';
    }
    if (args.type === 'number') {
      return /^\d+$/.test(val) || 'Only numbers allowed';
    }
    return true;
  };

  return {
    components: { Input },
    setup() {
      return { args, value, errorMsg, validateFn };
    },
    template: `
      <div style="width: 300px;">
        <Input
          v-bind="args"
          v-model="value"
          :onValidate="validateFn"
        >
          <template #error="{ message }">
            <span style="font-weight: bold; color: darkred;">{{ message || 'Error' }}</span>
          </template>
        </Input>
        <p>Current value: {{ value }}</p>
      </div>
    `,
  };
};

export const Default = Template.bind({});
Default.args = {
  title: 'Example Input',
  modelValue: 'Hello World',
  placeholder: 'Type something...',
  type: 'text',
  maxLength: 20,
  readonly: false,
  disabled: false,
};
