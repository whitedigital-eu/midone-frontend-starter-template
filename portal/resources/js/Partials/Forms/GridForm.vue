<template>
  <div
    class="gap-4 grid grid-cols-1 relative"
    :class="computedGridColsClass"
    data-role="grid-form"
  >
    <div
      v-for="(formSection, i) in formDataInLayout"
      :key="i"
      class="grid-item-container"
    >
      <div
        v-for="(formField, j) in formSection"
        :key="j"
        :data-has-error="formField.errors && formField.errors.length > 0"
      >
        <component
          :is="getComponent(formField.type as keyof typeof inputTypeToComponent) as any"
          v-bind="getComponentAttributes(formField)"
          v-model="formField.value"
          class="my-4"
          v-on="getEventHandlers(formField, emit)"
        />
        <ul v-if="formField.errors && formField.errors.length">
          <li
            v-for="(message, k) in formField.errors"
            :key="k"
            class="mb-4 text-danger"
          >
            {{ message }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, computed, Ref, UnwrapRef } from 'vue'

import {
  getComponentAttributes,
  getComponent,
  getEventHandlers,
  inputTypeToComponent,
} from './shared'

import { FormData } from 'wd-frontend-shared/types/FormData'
import { File } from '../../Types/File'

const { cols = 2, ...props } = defineProps<{
  formData: FormData
  formLayout: string[][]
  cols?: 1 | 2 | 3 | 4 | 5
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', formData: Ref<UnwrapRef<FormData>>): void
  (e: 'select-create-new-item', fieldName: string, item: string): void
  (
    e: 'remove-file',
    fieldName: string,
    fileIri: File['@id'],
    callback: (...args: any[]) => void
  ): void
}>()

const formData = ref<FormData>(props.formData)

const formDataInLayout = props.formLayout.map((gridItem: string[]) => {
  return gridItem.map((key: string) => formData.value[key])
})

watch(formData, () => emit('update:modelValue', formData), { deep: true })

const computedGridColsClass = computed(() => {
  switch (cols) {
    case 1:
      return `sm:grid-cols-1`
    case 2:
      return `sm:grid-cols-2`
    case 3:
      return `sm:grid-cols-3`
    case 4:
      return `sm:grid-cols-4`
    case 5:
      return `sm:grid-cols-5`
    default:
      return ''
  }
})
</script>
