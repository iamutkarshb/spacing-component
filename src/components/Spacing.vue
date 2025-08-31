<template>
  <div :style="computedStyle">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export type SpacingProps = {
  m?: string | number;
  p?: string | number;
  display?: string;
};

export default defineComponent({
  name: 'Spacing',
  props: {
    m: { type: [String, Number], default: undefined },
    p: { type: [String, Number], default: undefined },
    display: { type: String, default: undefined },
  },
  setup(props) {
    const computedStyle = computed(() => {
      const style: Record<string, string> = {};
      if (props.m !== undefined)
        style.margin = typeof props.m === 'number' ? `${props.m}px` : props.m;
      if (props.p !== undefined)
        style.padding = typeof props.p === 'number' ? `${props.p}px` : props.p;
      if (props.display) style.display = props.display;

      style.backgroundColor = 'red';
      style.width = '100px';
      style.height = '100px';
      console.log('Computed style:', style, props);
      return style;
    });
    return { computedStyle };
  },
});
</script>
