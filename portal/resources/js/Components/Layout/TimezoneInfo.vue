<template>
  <div class="box px-2 md:p-2 bg-white flex flex-col">
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
