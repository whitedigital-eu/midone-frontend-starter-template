<template>
  <div class="bg-white box flex flex-col md:p-2 px-2">
    <span>Laika zona: Rīga, Latvija</span>
    <span>Pareizs laiks: {{ currentTime }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getTimezoneTime } from '../../Helpers/DateTime'

const getFormattedTime = () => getTimezoneTime().format('HH:mm:ss')

const currentTime = ref(getFormattedTime())
setInterval(() => {
  currentTime.value = getFormattedTime()
}, 1000)
</script>
