<template>
  <nav
    v-if="breadcrumbs"
    aria-label="breadcrumb"
    class="-intro-x flex-1 h-[45px]"
    data-test="breadcrumbs"
  >
    <ol class="breadcrumb breadcrumb-light flex overflow-hidden text-lg">
      <li
        v-for="(breadcrumb, i) in breadcrumbs"
        :key="i"
        class="breadcrumb-item last:flex-1"
        :class="{ active: breadcrumb.active }"
      >
        <router-link
          v-if="!breadcrumb.active && breadcrumb.to"
          :to="breadcrumb.to"
        >
          {{ breadcrumb.text }}
        </router-link>
        <span v-else>{{ breadcrumb.text }}</span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { RouteLocationNormalized, RouteLocationRaw, useRoute } from 'vue-router'
import { computed, watch } from 'vue'
import { useBreadcrumbData } from '../../Stores/breadcrumbData'

const route = useRoute()
const breadcrumbData = useBreadcrumbData()

class Breadcrumb {
  constructor(
    public text: string,
    public to?: RouteLocationRaw,
    public active?: boolean
  ) {}
}

const routeToBreadcrumbs = (route: RouteLocationNormalized): Breadcrumb[] => {
  let items: Breadcrumb[] = []
  const customersBreadcrumb = new Breadcrumb('Klienti', {
    name: 'CUSTOMERS',
  })
  const serviceRequestBreadcrumb = new Breadcrumb('Izsaukumi', {
    name: 'SERVICE_REQUESTS',
  })
  const acceptanceCertificateBreadcrumb = new Breadcrumb('Akti', {
    name: 'ACCEPTANCE_CERTIFICATES',
  })

  switch (route.name) {
    case 'USERS':
      items = [new Breadcrumb('Lietotāji')]
      break
    case 'CLASSIFIERS':
      items = [new Breadcrumb('Klasifikatori')]
      break
    case 'AUDITS':
      items = [new Breadcrumb('Auditi')]
      break
    case 'PROFILE':
      items = [new Breadcrumb('Mans profils')]
      break
    default:
      break
  }

  if (items && items.length > 0) {
    items[items.length - 1].active = true
  }

  return items
}

const breadcrumbs = computed<Breadcrumb[] | null>(() => {
  if (!route || !route.matched.length) return null
  return routeToBreadcrumbs(route)
})

const setPageTitle = (bc: typeof breadcrumbs.value) => {
  if (!bc?.length) return
  // TODO: set default title
  const baseTitle = import.meta.env.VITE_APP_TITLE ?? ''
  document.title = `${bc[bc.length - 1].text} | ${baseTitle}`
}

watch(breadcrumbs, setPageTitle, { immediate: true })
</script>

<style>
.breadcrumb-item:not(:first-child):last-child span {
  @apply mt-2 inline-block overflow-hidden text-ellipsis overflow-hidden whitespace-nowrap max-w-[90%];
}
</style>
