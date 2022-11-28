<template>
  <nav
    v-if="breadcrumbs"
    aria-label="breadcrumb"
    class="-intro-x h-[45px] flex-1"
    data-test="breadcrumbs"
  >
    <ol class="breadcrumb breadcrumb-light text-lg overflow-hidden flex">
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
  const contractsBreadcrumb = new Breadcrumb('Līgumi', {
    name: 'CONTRACTS',
  })
  const offerTemplateBreadcrumb = new Breadcrumb('Piedāvājumu sagataves', {
    name: 'OFFER_TEMPLATES',
  })
  const estimateBreadcrumb = new Breadcrumb('Tāmes', {
    name: 'ESTIMATES',
  })
  const acceptanceCertificateBreadcrumb = new Breadcrumb('Akti', {
    name: 'ACCEPTANCE_CERTIFICATES',
  })

  switch (route.name) {
    case 'CUSTOMERS':
      items = [customersBreadcrumb]
      break
    case 'VIEW_CUSTOMER':
      items = [customersBreadcrumb]
      if (breadcrumbData.customerTitle) {
        items.push(
          new Breadcrumb(`Apskatīt klientu ${breadcrumbData.customerTitle}`)
        )
      }
      break
    case 'SERVICE_REQUESTS':
      items = [serviceRequestBreadcrumb]
      break
    case 'VIEW_SERVICE_REQUEST':
      items = [
        serviceRequestBreadcrumb,
        new Breadcrumb(`Apskatīt izsaukumu ${route.params.id}`),
      ]
      break
    case 'USERS':
      items = [new Breadcrumb('Lietotāji')]
      break
    case 'CLASSIFIERS':
      items = [new Breadcrumb('Klasifikatori')]
      break
    case 'AUDITS':
      items = [new Breadcrumb('Auditi')]
      break
    case 'USER_ROLES_PERMISSIONS':
      items = [new Breadcrumb('Lietotāju lomas un tiesības')]
      break
    case 'OFFER_TEMPLATES':
      items = [offerTemplateBreadcrumb]
      break
    case 'VIEW_OFFER_TEMPLATE':
      items = [offerTemplateBreadcrumb]
      if (breadcrumbData.offerTemplateTitle) {
        items.push(
          new Breadcrumb(
            `Apskatīt piedāvājuma sagatavi ${breadcrumbData.offerTemplateTitle}`
          )
        )
      }
      break
    case 'ESTIMATES':
      items = [estimateBreadcrumb]
      break
    case 'VIEW_ESTIMATE':
      items = [estimateBreadcrumb]
      if (breadcrumbData.estimateNr) {
        items.push(new Breadcrumb(`Apskatīt tāmi ${breadcrumbData.estimateNr}`))
      }
      break
    case 'ACCEPTANCE_CERTIFICATES':
      items = [acceptanceCertificateBreadcrumb]
      break
    case 'MEASUREMENT_UNITS':
      items = [new Breadcrumb('Mērvienības')]
      break
    case 'CONTRACTS':
      items = [contractsBreadcrumb]
      break
    case 'VIEW_CONTRACT':
      items = [contractsBreadcrumb]
      if (breadcrumbData.contractNr) {
        items.push(
          new Breadcrumb(`Apskatīt līgumu ${breadcrumbData.contractNr}`)
        )
      }
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
