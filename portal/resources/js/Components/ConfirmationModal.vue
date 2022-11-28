<template>
  <Modal @close="emit('close')" data-test="confirmation-modal">
    <template #header>
      <div class="text-2xl">Vai esi pārliecināts?</div>
    </template>
    <template #body>
      <div class="text-slate-500 my-4" v-if="!customTitle">
        Vai tiešām vēlies dzēst {{ title }}?
      </div>
      <div v-else class="text-slate-500 my-4">
        {{ customTitle }}
      </div>
    </template>
    <template #footer>
      <div class="flex gap-4">
        <button
          type="button"
          class="btn btn-outline-secondary w-full"
          data-test="cancel-button"
          @click="emit('close')"
        >
          Atcelt
        </button>
        <button
          type="button"
          class="btn btn-danger w-full"
          data-tw-dismiss="modal"
          data-test="delete-button"
          @click.prevent="emit('confirm')"
        >
          Dzēst
        </button>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '../Partials/Modal/Modal.vue'

const props = withDefaults(
  defineProps<{
    title?: string
    customTitle?: string | null
  }>(),
  {
    title: '',
    customTitle: null,
  }
)

const emit = defineEmits(['close', 'confirm'])
</script>
