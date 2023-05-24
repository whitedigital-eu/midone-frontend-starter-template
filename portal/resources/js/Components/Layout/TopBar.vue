<template>
  <div
    class="-mt-7 -mx-3 border-b border-white/[0.08] dark:md:from-darkmode-700 md:-mx-0 md:border-b-0 md:fixed md:from-slate-100 md:inset-x-0 md:min-h-[65px] md:mt-0 md:pt-7 md:px-10 md:to-transparent md:top-0 min-h-[unset] px-3 relative sm:-mx-8 sm:px-8 top-bar-boxed z-[51]"
  >
    <div
      class="flex flex-col gap-4 h-full items-left justify-between sm:flex-row xl:items-center"
    >
      <div class="flex flex-1 items-center">
        <span class="-intro-x block hidden logo md:flex w-[180px]">
          <!-- TODO: add logo source and alt text -->
          <img
            alt=""
            class="logo__image"
            src=""
          />
        </span>
        <Breadcrumbs />
      </div>

      <div
        class="basis-[215px] flex flex-shrink-0 gap-4 hidden items-center mb-2 md:flex ml-auto xl:order-3"
      >
        <TimezoneInfo class="ml-auto z-[1]" />

        <ProfileDropdown />
      </div>

      <div
        v-if="heartbeatStore.showReloadSection || impersonatedUserEmail"
        class="flex flex-wrap gap-4 items-center mx-auto pl-4 xl:order-2 z-[1]"
      >
        <div
          v-if="heartbeatStore.showReloadSection"
          class="border-2 border-success box px-4 py-1"
        >
          <span class="mr-8 text-success text-xl">
            Iznākusi jauna sistēmas versija! Lūdzu atjaunojiet lapu!
          </span>
          <button class="btn btn-primary text-lg" @click="reloadPage">
            Atjaunot
          </button>
        </div>

        <div v-if="impersonatedUserEmail" class="bg-white px-4 py-2 rounded-md">
          <button class="btn btn-primary" @click="handleStopImpersonation">
            Beigt uzdoties par lietotāju
            {{ impersonatedUserEmail }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  impersonatedUserEmail,
  stopImpersonation,
} from '../../Mixins/Impersonation'
import { useRouter } from 'vue-router'
import Breadcrumbs from './Breadcrumbs.vue'
import TimezoneInfo from './TimezoneInfo.vue'
import ProfileDropdown from './ProfileDropdown.vue'
import { onMounted } from 'vue'
import { useHeartbeat } from '../../Stores/heartbeat'

const router = useRouter()
const heartbeatStore = useHeartbeat()

const reloadPage = () => window.location.reload()

const handleStopImpersonation = () => {
  stopImpersonation()
  router.currentRoute.value.name === 'CUSTOMERS'
    ? router.push({ name: 'USERS' })
    : router.push({ name: 'CUSTOMERS' })
}

onMounted(() => {
  heartbeatStore.getHeartbeatResponse()
  setInterval(() => {
    if (!heartbeatStore.showReloadSection) heartbeatStore.getHeartbeatResponse()
  }, 10000)
})
</script>

<style lang="scss">
.logo__image {
  height: 48px;

  @media (max-width: 768px) {
    height: 24px;
  }
}
</style>
