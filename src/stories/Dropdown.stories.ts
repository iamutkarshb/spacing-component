import Dropdown from '@components/Dropdown.vue';
import { ref, watch } from 'vue';
import type { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Label or title for the dropdown',
    },
    dropdownList: {
      control: 'array',
      description: 'Array of items displayed in the dropdown',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the dropdown if true',
    },
    open: {
      control: 'boolean',
      description: 'Controls whether the dropdown is open',
    },
  },
} as Meta<typeof Dropdown>;

const Template: StoryFn<typeof Dropdown> = (args) => ({
  components: { Dropdown },
  setup() {
    const showDropdown = ref(args.open);
    const buttonRef = ref<HTMLElement | null>(null);
    const selectedItem = ref<string | null>(null);

    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value;
    };

    const onItemClick = (item: string) => {
      console.log('Selected item:', item);
      selectedItem.value = item;
    };

    watch(
      () => args.open,
      (newVal) => {
        showDropdown.value = newVal;
      }
    );

    return {
      args,
      showDropdown,
      buttonRef,
      selectedItem,

      onItemClick,
      toggleDropdown,
    };
  },
  template: `
    <div >
    <div style="display: flex; gap: 8px; align-items: center">
      <button ref="buttonRef" @click="toggleDropdown">Open Suggestions</button>
      <div v-if="selectedItem">Selected Item: {{selectedItem}}</div>
    </div>
      <Dropdown
        v-bind="args"
        :open="showDropdown"
        :target="buttonRef"
        @selected="onItemClick"
      />
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  title: 'Suggestions',
  dropdownList: [
    { label: 'Set this value to 20px' },
    { label: 'Set all value to this value' },
    { label: 'Set this value to auto' },
    { label: 'Set all values to auto' },
    { label: 'Unset this value' },
    { label: 'Unset all values' },
  ],
  disabled: false,
  open: true,
};
