<template>
  <div
    class="grid relative gap-4 grid-cols-1"
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
          :is="getComponent(formField.type)"
          v-bind="getComponentAttributes(formField)"
          v-model="formField.value"
          class="my-4"
          v-on="getEventHandlers(formField)"
        />
        <ul v-if="formField.errors && formField.errors.length">
          <li
            v-for="(message, k) in formField.errors"
            :key="k"
            class="text-danger mb-4"
          >
            {{ message }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, computed } from 'vue'

import { getComponentAttributes, getComponent } from './shared'

import { FormData } from 'wd-frontend-shared/types/FormData'

const props = withDefaults(
  defineProps<{
    formData: FormData
    formLayout: string[][]
    cols?: 1 | 2 | 3 | 4 | 5
  }>(),
  {
    cols: 2,
  }
)

const emit = defineEmits([
  'update:modelValue',
  'select-create-new-item',
  'remove-file',
])

const getEventHandlers = (formField: any) => {
  if (
    formField.type === 'simple-select' ||
    formField.type === 'data-fetching-select'
  ) {
    return {
      'create-new-item': (item: any) =>
        emit('select-create-new-item', formField.name, item),
    }
  } else if (formField.type === 'file-upload') {
    return {
      'remove-file': (fileIri: string, callback: any) =>
        emit('remove-file', formField.name, fileIri, callback),
    }
  }

  return {}
}

const formData = ref<FormData>(props.formData)

const formDataInLayout = props.formLayout.map((gridItem: string[]) => {
  return gridItem.map((key: string) => formData.value[key])
})

watch(formData, () => emit('update:modelValue', formData), { deep: true })

const computedGridColsClass = computed(() => {
  switch (props.cols) {
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
