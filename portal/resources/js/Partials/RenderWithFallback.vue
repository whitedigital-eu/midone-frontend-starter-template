<template>
  <span v-if="!html">
    <slot></slot>
    <span v-if="shouldRender">{{ renderedValue }}</span>
    <em v-else class="text-slate-500">nav uzstādīts</em>
  </span>
  <div v-else>
    <slot></slot>
    <div v-if="shouldRender" v-html="variableToRender"></div>
    <em v-else class="text-slate-500">nav uzstādīts</em>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { dateTimeIntervalToHumanReadableString } from '../Helpers/DateTime'
import {RENDER_FORMAT} from "../Helpers/Global";

const props = defineProps<{
  variableToRender?: string | number | null
  html?: boolean
  format?: RENDER_FORMAT
}>()

const shouldRender = computed<boolean>(
  () =>
    props.variableToRender !== null &&
    typeof props.variableToRender !== 'undefined'
)

const renderedValue = computed(() => {
  if (!props.variableToRender && props.variableToRender !== 0) return ''

  if (props.format === RENDER_FORMAT.money) {
    let val = props.variableToRender
    if (typeof val === 'string') val = parseFloat(val)
    return val.toFixed(2).replace('.', ',')
  }

  if (
    props.format === RENDER_FORMAT.dateTimeInterval &&
    typeof props.variableToRender === 'string'
  ) {
    return dateTimeIntervalToHumanReadableString(props.variableToRender)
  }

  return props.variableToRender
})
</script>
