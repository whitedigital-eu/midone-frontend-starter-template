<template>
  <div class="xl:mt-0 flex gap-2">
    <button
      type="button"
      class="btn btn-outline-secondary mr-1 grow"
      @click="emit('cancel-click')"
    >
      Atcelt
    </button>
    <Button :loading="isLoading" class="grow" @click="emit('proceed-click')">
      {{ buttonText }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import Button from '../Button.vue'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    isLoading?: boolean
    iri?: string | null
  }>(),
  {
    isLoading: false,
    iri: null,
  }
)

const emit = defineEmits<{
  (e: 'cancel-click'): void
  (e: 'proceed-click'): void
}>()

const buttonText = computed(() => (props.iri ? 'Saglabāt' : 'Izveidot'))
</script>
