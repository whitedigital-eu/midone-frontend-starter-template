<template>
  <div class="border-slate-200/60 border-t dark:border-darkmode-400 p-5">
    <div class="flex gap-4 justify-between mb-4">
      <div class="flex flex-col gap-4">
        <slot name="first-2-items"></slot>
      </div>
      <ActionButton
        v-if="showEditBtn"
        action="edit"
        class="h-[58px]"
        @click="emit('edit-click')"
      />
    </div>
    <div class="flex flex-col gap-4">
      <slot name="rest-of-items"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import ActionButton from '../Partials/Buttons/ActionButton.vue'

const { showEditBtn = true } = defineProps<{ showEditBtn?: boolean }>()

const emit = defineEmits<{ (e: 'edit-click'): void }>()
</script>
