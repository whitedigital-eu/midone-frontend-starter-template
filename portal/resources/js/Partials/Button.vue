<template>
  <button
    class="btn btn-primary px-7 w-auto"
    :class="{ 'pr-1': loading }"
    :disabled="loading"
  >
    <slot />
    <LoadingIcon
      v-if="loading"
      data-test="btn-loading-icon"
      icon="oval"
      color="white"
      class="w-4 h-4 ml-2"
    />
  </button>
</template>

<script setup lang="ts">
import LoadingIcon from './LoadingIcon.vue'

const props = withDefaults(
  defineProps<{
    loading?: boolean
  }>(),
  {
    loading: false,
  }
)
</script>
