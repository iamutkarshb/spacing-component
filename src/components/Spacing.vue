<template>
  <div class="spacing-outer">
    <div class="title title-margin">Margins</div>
    <div
      v-for="item in marginFields"
      :key="item.side"
      class="spacing-input-field"
      :class="item.side"
      :style="item.style"
    >
      <Input
        v-model="current.margin[item.side]"
        @blur="
          (e: Event) => handleChange('margin', item.side, (e.target as HTMLInputElement).value)
        "
        @keydown.enter="
          (e: KeyboardEvent) =>
            handleChange('margin', item.side, (e.target as HTMLInputElement).value)
        "
        placeholder="0px"
        :title="item.title"
        :readonly="readOnlyFields.margin[item.side]"
      />
      <img
        src="../assets/icons/dropdownIcon.svg"
        class="dropdown-icon"
        @click="openDropdown($event, 'margin', item.side)"
        role="button"
        :aria-expanded="isDropdownOpen"
      />
    </div>

    <div class="spacing-middle">
      <div class="title">Paddings</div>
      <div
        v-for="item in paddingFields"
        :key="item.side"
        class="spacing-input-field"
        :class="item.side"
        :style="item.style"
      >
        <Input
          v-model="current.padding[item.side]"
          @blur="
            (e: Event) => handleChange('padding', item.side, (e.target as HTMLInputElement).value)
          "
          @keydown.enter="
            (e: KeyboardEvent) =>
              handleChange('padding', item.side, (e.target as HTMLInputElement).value)
          "
          placeholder="0px"
          :title="item.title"
          :readonly="readOnlyFields.padding[item.side] || false"
        />
        <img
          src="../assets/icons/dropdownIcon.svg"
          class="dropdown-icon"
          @click="openDropdown($event, 'padding', item.side)"
          role="button"
          :aria-expanded="isDropdownOpen"
        />
      </div>

      <slot>
        <div class="responsive-box"></div>
      </slot>
    </div>

    <Dropdown
      :open="isDropdownOpen"
      :dropdownList="dropdownList"
      :target="dropdownTarget"
      title="Suggestions"
      @selected="onDropdownSelected"
      :disabled="
        (activeGroup && disableSuggestion?.[activeGroup]) ||
        (activeGroup && activeSide && readOnlyFields?.[activeGroup]?.[activeSide]) ||
        false
      "
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  watch,
  PropType,
  ref,
  onMounted,
  onBeforeUnmount,
  nextTick,
  computed,
  type CSSProperties,
} from 'vue';
import Dropdown from './Dropdown.vue';
import Input from './Input.vue';
import { createFields, isValidCssValue } from '@/utils/utils';

type Side = 'top' | 'right' | 'bottom' | 'left';
type Group = 'margin' | 'padding';

export interface Field {
  side: Side;
  title: string;
  style?: CSSProperties;
}

export interface SpacingCustomItemProps {
  label: string;
  applyToAll: boolean;
  valueToApply: string;
}

export interface SpacingValueProps {
  margin: Record<Side, string>;
  padding: Record<Side, string>;
}

export interface SpacingReadOnlyFieldProps {
  margin: Record<Side, boolean>;
  padding: Record<Side, boolean>;
}

export interface SpacingProps {
  value: SpacingValueProps;
  defaultValue: { margin: string; padding: string };
  customOptions?: SpacingCustomItemProps[];
  disableSuggestion: { margin: boolean; padding: boolean };
  readOnlyFields?: SpacingReadOnlyFieldProps;
}

export default defineComponent({
  name: 'Spacing',
  components: { Dropdown, Input },
  props: {
    value: {
      type: Object as PropType<SpacingValueProps>,
      default: undefined,
    },
    defaultValue: {
      type: Object as PropType<SpacingProps['defaultValue']>,
      default: () => ({
        margin: 'auto',
        padding: 'auto',
      }),
    },
    customOptions: {
      type: Array as PropType<SpacingCustomItemProps[]>,
      default: () => [],
    },
    disableSuggestion: {
      type: Object as PropType<Record<Group, boolean>>,
      default: () => ({
        margin: false,
        padding: false,
      }),
    },
    readOnlyFields: {
      type: Object as PropType<SpacingReadOnlyFieldProps>,
      default: () => ({
        margin: { top: false, right: false, bottom: false, left: false },
        padding: { top: false, right: false, bottom: false, left: false },
      }),
    },
  },
  emits: ['onUpdate'],
  setup(props, { emit }) {
    const isDropdownOpen = ref(false);
    const dropdownTarget = ref<HTMLElement | null>(null);
    const activeGroup = ref<Group | null>(null);
    const activeSide = ref<Side | null>(null);

    const marginFields: Field[] = createFields('margin', {
      vertical: '7px',
      horizontal: '6px',
    });
    const paddingFields: Field[] = createFields('padding', {
      vertical: '8px',
      horizontal: '11px',
    });

    const current = reactive<SpacingValueProps>({
      margin: {
        top: props.value?.margin?.top ?? props.defaultValue.margin,
        right: props.value?.margin?.right ?? props.defaultValue.margin,
        bottom: props.value?.margin?.bottom ?? props.defaultValue.margin,
        left: props.value?.margin?.left ?? props.defaultValue.margin,
      },
      padding: {
        top: props.value?.padding?.top ?? props.defaultValue.padding,
        right: props.value?.padding?.right ?? props.defaultValue.padding,
        bottom: props.value?.padding?.bottom ?? props.defaultValue.padding,
        left: props.value?.padding?.left ?? props.defaultValue.padding,
      },
    });

    const dropdownList = computed<SpacingCustomItemProps[]>(() => {
      if (!activeGroup.value) return [];
      return [
        ...(props.customOptions || []),
        {
          label: `Set this value to ${props.defaultValue?.[activeGroup.value] ?? ''}`,
          applyToAll: false,
          valueToApply: `${props.defaultValue?.[activeGroup.value] ?? ''}`,
        },
        {
          label: `Set all value to this value`,
          applyToAll: true,
          valueToApply: `${activeSide.value ? current?.[activeGroup.value]?.[activeSide.value] : ''}`,
        },
        { label: 'Set this value to auto', applyToAll: false, valueToApply: 'auto' },
        { label: 'Set all values to auto', applyToAll: true, valueToApply: 'auto' },
        { label: 'Unset this value', applyToAll: false, valueToApply: 'unset' },
        { label: 'Unset all values', applyToAll: true, valueToApply: 'unset' },
      ];
    });

    const fullSnapshot = (): SpacingValueProps => ({
      margin: { ...current.margin },
      padding: { ...current.padding },
    });

    const handleChange = (group: Group, side: Side, value: string) => {
      const inputValue = isValidCssValue(group, value) ? value : '0px';
      const finalValue = value === '' ? props.defaultValue[group] : inputValue;

      current[group][side] = finalValue;

      const changed = { [group]: { [side]: finalValue } };
      emit('onUpdate', JSON.stringify({ changed, value: fullSnapshot() }, null, 2));
    };

    const openDropdown = (event: MouseEvent, group: Group, side: Side) => {
      event.stopPropagation();
      activeGroup.value = group;
      activeSide.value = side;
      dropdownTarget.value = event.currentTarget as HTMLElement;
      nextTick(() => (isDropdownOpen.value = true));
    };

    const closeDropdown = () => {
      isDropdownOpen.value = false;
      dropdownTarget.value = null;
      activeGroup.value = null;
      activeSide.value = null;
    };

    const onDropdownSelected = (item: SpacingCustomItemProps) => {
      if (!activeGroup.value || !activeSide.value) {
        closeDropdown();
        return;
      }

      const group = activeGroup.value;
      const side = activeSide.value;
      const val = item.valueToApply ?? props.defaultValue?.[group];

      const changed: Record<Group, Partial<Record<Side, string>>> = {} as any;

      if (item.applyToAll) {
        (Object.keys(current[group]) as Side[]).forEach((s) => {
          current[group][s] = val;
          changed[group] = { ...changed[group], [s]: val };
        });
      } else {
        current[group][side] = val;
        changed[group] = { ...changed[group], [side]: val };
      }

      emit('onUpdate', JSON.stringify({ changed, value: fullSnapshot() }, null, 2));
      closeDropdown();
    };

    const handleDocClick = () => {
      if (isDropdownOpen.value) closeDropdown();
    };
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDropdownOpen.value) {
        closeDropdown();
      }
    };

    watch(
      () => props.value,
      (nv) => {
        if (!nv) return;
        (['top', 'right', 'bottom', 'left'] as Side[]).forEach((side) => {
          current.margin[side] = nv.margin?.[side] ?? props.defaultValue.margin;
          current.padding[side] = nv.padding?.[side] ?? props.defaultValue.padding;
        });
      },
      { deep: true }
    );

    onMounted(() => {
      document.addEventListener('click', handleDocClick);
      window.addEventListener('keydown', handleKeydown);
    });
    onBeforeUnmount(() => {
      document.removeEventListener('click', handleDocClick);
      window.removeEventListener('keydown', handleKeydown);
    });

    return {
      current,
      marginFields,
      paddingFields,
      activeGroup,
      activeSide,
      isDropdownOpen,
      dropdownTarget,
      dropdownList,

      handleChange,
      openDropdown,
      onDropdownSelected,
    };
  },
});
</script>

<style scoped>
::v-deep(input) {
  width: 30px;
  z-index: 9999;
  padding: 3px !important;
}
::v-deep(input:not(:hover):not(:focus):not(:active)) {
  border: none !important;
  background: transparent;
  outline: none;
  padding: 4px !important;
}
.dropdown-icon {
  transform: scale(2);
  border-width: 1px;
  cursor: pointer;
}
.spacing-input-field {
  position: absolute;
  background: transparent;
  display: flex;
  align-items: center;
  gap: 2px;
}
.title {
  font-family: var(--font-family-base);
  font-weight: 700;
  font-size: 12px;
  color: #485350;
  position: absolute;
  left: 11px;
  top: 9px;
}
.spacing-outer {
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid #e2e5e6;
  display: block;
  position: relative;
  background: #f8fafb;
  padding: 35px 60px;
}
.spacing-middle {
  box-sizing: border-box;
  border-radius: 5px;
  background: #1a73e80d;
  border: 1px solid #1a73e8;
  display: flex;
  position: relative;
  padding: 47px 96px;
}
.responsive-box {
  flex: 1;
  width: 100vw;
  max-width: 213px;
  height: 40px;
  border-radius: 5px;
  background: #fff;
  border: 1px solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
@media (max-width: 768px) {
  .responsive-box {
    max-width: 180px;
  }
}
@media (max-width: 480px) {
  .responsive-box {
    max-width: 140px;
  }
}
</style>
