<template>
  <div class="inline-block relative text-left">
    <button
      id="menu-button"
      aria-expanded="false"
      aria-haspopup="false"
      class="btn btn-primary inline-flex px-4 py-2.5"
      :class="props.buttonClass"
      type="button"
      @click="toggleDropdown"
    >
      <span v-if="title">{{ title }}</span>
      <Icon
        :class="[{ 'ml-2': props.title }, props.titleIconClass]"
        name="MoreVertical"
        :size="18"
      />
    </button>
    <div
      v-show="showMenu"
      aria-labelledby="menu-button"
      aria-orientation="vertical"
      class="absolute bg-white focus:outline-none mt-2 origin-top-right right-0 ring-1 ring-black ring-opacity-5 rounded-md shadow-lg w-56 z-10"
      role="menu"
      tabindex="-1"
    >
      <div class="py-1" role="none">
        <a
          v-for="(item, i) in menuItems"
          :id="`menu-item-${i}`"
          :key="i"
          class="flex px-4 py-2 text-gray-700 text-sm"
          :href="item.url || 'javascript:void(0)'"
          role="menuitem"
          tabindex="-1"
          @click="item.eventName && $emit(item.eventName)"
        >
          <Icon v-if="item.icon" class="mr-2" :name="item.icon" :size="16" />
          {{ item.title }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from './Common/Icons/Icon.vue'
import { ref } from 'vue'

interface Item {
  title: string
  url?: string
  eventName?: string
  icon?: string
}

const props = defineProps<{
  title?: string
  titleIconClass?: string
  buttonClass?: string | string[] | Record<string, string>
  menuItems: Item[]
}>()
const showMenu = ref(false)

const toggleDropdown = () => {
  showMenu.value = !showMenu.value
}
</script>
