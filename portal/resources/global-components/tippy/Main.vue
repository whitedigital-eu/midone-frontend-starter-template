<template>
  <component :is="tag" ref="tippyRef">
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { ref, inject, onMounted } from 'vue'
import tippy, { roundArrow, animateFill } from 'tippy.js'

const props = withDefaults(
  defineProps<{
    content: string
    tag?: string
    options?: Record<any, any>
    refKey?: string | null
  }>(),
  {
    tag: 'span',
    options: () => ({}),
    refKey: null,
  }
)

const tippyRef = ref()
const init = () => {
  tippy(tippyRef.value, {
    plugins: [animateFill],
    content: props.content,
    arrow: roundArrow,
    popperOptions: {
      modifiers: [
        {
          name: 'preventOverflow',
          options: {
            rootBoundary: 'viewport',
          },
        },
      ],
    },
    animateFill: false,
    animation: 'shift-away',
    ...props.options,
  })
}

const bindInstance = () => {
  if (props.refKey) {
    const bind = inject(`bind[${props.refKey}]`)
    if (bind && typeof bind === 'function') {
      bind(tippyRef.value)
    }
  }
}

onMounted(() => {
  init()
  bindInstance()
})
</script>
