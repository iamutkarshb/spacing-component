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
        @blur="(e) => handleChange('margin', item.side, e.target.value)"
        @keydown.enter="(e) => handleChange('margin', item.side, e.target.value)"
        placeholder="0px"
        :title="item.title"
      />
      <img src="../assets/icons/dropdownIcon.svg" class="dropdown-icon" />
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
          @blur="(e) => handleChange('padding', item.side, e.target.value)"
          @keydown.enter="(e) => handleChange('padding', item.side, e.target.value)"
          placeholder="0px"
          :title="item.title"
        />
        <img src="../assets/icons/dropdownIcon.svg" class="dropdown-icon" />
      </div>

      <slot>
        <div class="responsive-box"></div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch, PropType, computed } from 'vue';
import Dropdown from './Dropdown.vue';
import Input from './Input.vue';
import { createFields, isValidCssValue } from '@/utils/utils';

type SizeInput = string | number;

export default defineComponent({
  name: 'Spacing',
  components: { Dropdown, Input },
  props: {
    value: {
      type: Object as PropType<{
        margin?: { top?: SizeInput; right?: SizeInput; bottom?: SizeInput; left?: SizeInput };
        padding?: { top?: SizeInput; right?: SizeInput; bottom?: SizeInput; left?: SizeInput };
      }>,
      default: undefined,
    },
    defaultValue: { type: String as PropType<string>, default: 'auto' },
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const current = reactive({
      margin: {
        top: (props.value?.margin?.top ?? props.defaultValue) as SizeInput,
        right: (props.value?.margin?.right ?? props.defaultValue) as SizeInput,
        bottom: (props.value?.margin?.bottom ?? props.defaultValue) as SizeInput,
        left: (props.value?.margin?.left ?? props.defaultValue) as SizeInput,
      },
      padding: {
        top: (props.value?.padding?.top ?? props.defaultValue) as SizeInput,
        right: (props.value?.padding?.right ?? props.defaultValue) as SizeInput,
        bottom: (props.value?.padding?.bottom ?? props.defaultValue) as SizeInput,
        left: (props.value?.padding?.left ?? props.defaultValue) as SizeInput,
      },
    } as {
      margin: Record<string, SizeInput>;
      padding: Record<string, SizeInput>;
    });

    watch(
      () => props.value,
      (nv) => {
        current.margin.top = (nv?.margin?.top ?? props.defaultValue) as SizeInput;
        current.margin.right = (nv?.margin?.right ?? props.defaultValue) as SizeInput;
        current.margin.bottom = (nv?.margin?.bottom ?? props.defaultValue) as SizeInput;
        current.margin.left = (nv?.margin?.left ?? props.defaultValue) as SizeInput;
        current.padding.top = (nv?.padding?.top ?? props.defaultValue) as SizeInput;
        current.padding.right = (nv?.padding?.right ?? props.defaultValue) as SizeInput;
        current.padding.bottom = (nv?.padding?.bottom ?? props.defaultValue) as SizeInput;
        current.padding.left = (nv?.padding?.left ?? props.defaultValue) as SizeInput;
      },
      { deep: true }
    );

    const marginFields = createFields('margin', { vertical: '7px', horizontal: '6px' });
    const paddingFields = createFields('padding', { vertical: '8px', horizontal: '11px' });

    const fullSnapshot = () => ({
      margin: {
        top: current.margin.top ?? props.defaultValue,
        right: current.margin.right ?? props.defaultValue,
        bottom: current.margin.bottom ?? props.defaultValue,
        left: current.margin.left ?? props.defaultValue,
      },
      padding: {
        top: current.padding.top ?? props.defaultValue,
        right: current.padding.right ?? props.defaultValue,
        bottom: current.padding.bottom ?? props.defaultValue,
        left: current.padding.left ?? props.defaultValue,
      },
    });

    const handleChange = (group: 'margin' | 'padding', side: string, value: string) => {
      const inputValue = isValidCssValue(group, value) ? value : '0px';

      if (!isValidCssValue(group, value)) {
        current[group][side] = '0px';
      }

      const finalValue = value === '' ? props.defaultValue : inputValue;
      current[group][side] = finalValue;
      const changed: any = { margin: undefined, padding: undefined };
      changed[group] = { [side]: finalValue };
      const valueSnapshot = fullSnapshot();
      emit('update:value', JSON.parse(JSON.stringify(valueSnapshot)));
      if (!changed.margin) delete changed.margin;
      if (!changed.padding) delete changed.padding;
      console.log(JSON.stringify({ changed, value: valueSnapshot }, null, 2));
    };

    return {
      current,
      marginFields,
      paddingFields,
      handleChange,
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
  width: 100%;
  flex: 1;
  width: 213px;
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
    width: 100%;
  }
}
@media (max-width: 480px) {
  .responsive-box {
    max-width: 140px;
    width: 100%;
  }
}
</style>
