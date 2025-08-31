<template>
  <teleport :to="target || 'body'">
    <div
      v-if="isOpen"
      class="dropdown"
      ref="root"
      @keydown="onKeydown"
      tabindex="-1"
      role="dialog"
      aria-label="Spacing suggestions"
      :style="dropdownStyles"
    >
      <div v-if="title" class="dropdown-title">
        {{ title }}
      </div>
      <div class="dropdown-list">
        <div
          v-if="dropdownList.length"
          v-for="(item, index) in dropdownList"
          :key="index"
          v-bind="{ ...item }"
          class="dropdown-item"
          @click="$emit('selected', item)"
        >
          {{ item.value }}
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType, watch, reactive } from 'vue';

export interface DropdownProps {
  target?: HTMLElement | null;
  title?: string;
  dropdownList?: string[];
  disabled?: boolean;
  open?: boolean;
}

export default defineComponent({
  name: 'Dropdown',
  props: {
    target: { type: Object as PropType<HTMLElement | null>, default: null },
    title: { type: String, default: '' },
    dropdownList: { type: Array as PropType<string[]>, default: () => [] },
    disabled: { type: Boolean, default: false },
    open: { type: Boolean, default: false },
  },
  emits: ['selected'],
  setup(props, { emit }) {
    const root = ref<HTMLElement | null>(null);
    const isOpen = computed(() => props.open && !props.disabled);

    const dropdownStyles = reactive({ top: '0px', left: '0px', position: 'absolute' });

    const updatePosition = () => {
      if (props.target) {
        const rect = props.target.getBoundingClientRect();
        dropdownStyles.top = `${rect.bottom + 8}px`;
        dropdownStyles.left = `${rect.left}px`;
      }
    };

    watch(
      () => props.open,
      (val) => {
        if (val) updatePosition();
      }
    );

    return { root, isOpen, dropdownStyles, title: props.title, dropdownList: props.dropdownList };
  },
});
</script>

<style scoped>
.dropdown {
  border-radius: 5px;
  width: 145px;
  max-height: 145px;
  overflow-y: auto;
  box-shadow: 0px 2px 4px 0px #00000029;
  background: #fff;
  padding: 8px 0px;
  z-index: 9999;
  outline: none;
  position: absolute;
}

.dropdown-title {
  font-family: var(--font-family-base);
  font-weight: 700;
  padding: 0px 7px;
  font-style: Bold;
  font-size: 6px;
  line-height: 100%;
  letter-spacing: 0%;
  display: flex;
  padding-bottom: 8px;
  color: #485350;
}

.dropdown-item {
  font-family: var(--font-family-base);
  font-weight: 400;
  font-style: Regular;
  font-size: 8px;
  padding: 5px 12px;
  line-height: 100%;
  letter-spacing: 0%;
  display: flex;
  color: #485350;
}

.dropdown-item:hover {
  background: #f0f0f0;
}
</style>
