<template>
  <div>
    <input
      ref="inputRef"
      :type="type"
      :aria-label="title"
      class="inputfield"
      :class="readonly ? 'readonly' : ''"
      :value="internalValue"
      :placeholder="placeholder"
      :readonly="readonly"
      :disabled="disabled"
      @input="onInput"
      @blur="validate"
      @keydown.enter="onEnter"
    />
    <div v-if="errorMessage" class="error">
      <slot name="error" :message="errorMessage">
        {{ errorMessage }}
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType } from 'vue';

export interface InputProps {
  title?: string;
  modelValue?: string;
  placeholder?: string;
  readonly?: boolean;
  disabled?: boolean;
  type?: 'text' | 'number' | 'email' | 'password';
  onValidate?: (value: string) => boolean | string;
}

export default defineComponent({
  name: 'Input',
  props: {
    title: { type: String, default: '' },
    modelValue: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    readonly: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    type: {
      type: String as PropType<'text' | 'number' | 'email' | 'password'>,
      default: 'text',
    },
    onValidate: Function as PropType<(value: string) => boolean | string>,
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const inputRef = ref<HTMLInputElement | null>(null);
    const internalValue = ref(props.modelValue);
    const errorMessage = ref<string | null>(null);

    watch(
      () => props.modelValue,
      (val) => (internalValue.value = val)
    );

    const onInput = (e: Event) => {
      const val = (e.target as HTMLInputElement).value;
      internalValue.value = val;
      emit('update:modelValue', val);
      errorMessage.value = null;
    };

    const validate = () => {
      if (!props.onValidate) return;
      const result = props.onValidate(internalValue.value);
      errorMessage.value = result === true ? null : (result as string);
    };

    const onEnter = () => inputRef.value?.blur();

    return {
      internalValue,
      inputRef,
      errorMessage,
      onInput,
      validate,
      onEnter,
    };
  },
});
</script>

<style scoped>
.inputfield {
  padding: 6px 8px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 6px;
  font-family: var(--font-family-base);
  font-weight: 700;
  font-size: 14px;
  line-height: 100%;
  color: #485350;
}
.error {
  color: #c0392b;
  font-size: 12px;
}
.inputfield:disabled,
.inputfield.readonly {
  color: #4853504d;
}
</style>
