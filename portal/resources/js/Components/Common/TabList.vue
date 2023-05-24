<template>
  <ul
    class="bg-slate-200 dark:bg-black/10 flex gap-2 nav nav-pills p-1 rounded-md sm:basis-[300px] sm:h-[40px]"
    role="tablist"
  >
    <li
      v-for="tab in tabs"
      :key="JSON.stringify(tab)"
      class="flex-1 nav-item"
      role="presentation"
    >
      <button
        :aria-selected="activeTabId === tab.id"
        class="!m-0 h-full nav-link px-2 py-1.5 sm:whitespace-nowrap w-full"
        :class="{ active: activeTabId === tab.id }"
        role="tab"
        type="button"
        @click="() => handleTabClick(tab)"
      >
        {{ tab.text }}
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Tab {
  id: string
  text: string
}

const props = defineProps<{
  modelValue: string
  tabs: Tab[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', activeTabId: string): void
}>()

const activeTabId = ref(props.modelValue)

const handleTabClick = (tab: Tab) => {
  activeTabId.value = tab.id
  emit('update:modelValue', tab.id)
}
</script>
