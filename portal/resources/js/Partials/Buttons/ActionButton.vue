<template>
  <button class="bg-white btn" :class="iconPaddingClass" :data-test="dataTest">
    <component :is="icon" :size="iconSizeComputed" />
  </button>
</template>

<script setup lang="ts">
import { Edit, Plus, Trash } from 'lucide-vue-next'
import { computed } from 'vue'

const props = defineProps<{
  action: 'add' | 'edit' | 'delete'
  small?: boolean
}>()

const icon = computed(() => {
  return {
    add: Plus,
    edit: Edit,
    delete: Trash,
  }[props.action]
})

const iconSizeComputed = computed(() => (props.small ? 16 : 24))
const iconPaddingClass = computed(() =>
  props.small ? 'py-1 px-2' : 'py-2 px-4'
)
const dataTest = computed(
  () => `${props.small ? 'small' : 'large'}-${props.action}-btn`
)
</script>
