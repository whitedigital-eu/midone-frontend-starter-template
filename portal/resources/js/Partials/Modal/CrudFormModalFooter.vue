<template>
  <div class="flex gap-2 xl:mt-0">
    <button
      class="btn btn-outline-secondary grow mr-1"
      type="button"
      @click="emit('cancel-click')"
    >
      Atcelt
    </button>
    <Button class="grow" :loading="isLoading" @click="emit('proceed-click')">
      {{ buttonText }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import Button from '../Buttons/Button.vue'
import { computed } from 'vue'

const { isLoading, iri = null } = defineProps<{
  isLoading: boolean
  iri?: string | null
}>()

const emit = defineEmits<{
  (e: 'cancel-click'): void
  (e: 'proceed-click'): void
}>()

const buttonText = computed(() => (iri ? 'Saglabāt' : 'Izveidot'))
</script>
