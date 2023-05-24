<template>
  <component
    :is="getComponent(formField.type as keyof typeof inputTypeToComponent) as any"
    v-bind="getComponentAttributes(formField)"
    v-model="formField.value"
    class="my-4"
    v-on="getEventHandlers(formField, emit)"
  />
  <ul v-if="formField.errors && formField.errors.length">
    <li
      v-for="(message, j) in formField.errors"
      :key="j"
      class="mb-4 text-danger"
    >
      {{ message }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import {
  getComponentAttributes,
  getComponent,
  getEventHandlers,
  inputTypeToComponent,
} from './shared'
import { AnyFormField } from 'wd-frontend-shared/models/FormFields'
import { Ref, UnwrapRef } from 'vue'
import { FormData } from 'wd-frontend-shared/types/FormData'
import { File } from '../../Types/File'

defineProps<{ formField: AnyFormField }>()

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
</script>
