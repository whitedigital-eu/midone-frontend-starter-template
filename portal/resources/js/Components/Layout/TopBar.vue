<template>
  <div
    class="top-bar-boxed min-h-[unset] md:min-h-[65px] z-[51] border-b border-white/[0.08] -mt-7 md:mt-0 -mx-3 sm:-mx-8 md:-mx-0 px-3 md:border-b-0 relative md:fixed md:inset-x-0 md:top-0 sm:px-8 md:px-10 md:pt-7 md:bg-gradient-to-b md:from-slate-100 md:to-transparent dark:md:from-darkmode-700"
  >
    <div
      class="h-full flex flex-col sm:flex-row justify-between gap-4 items-left xl:items-center"
    >
      <div class="flex items-center flex-1">
        <span class="logo -intro-x hidden md:flex w-[180px] block">
          <img
            alt=""
            class="logo__image"
            src="/images/logos/logo.png"
          />
        </span>
        <Breadcrumbs />
      </div>

      <div
        class="hidden md:flex xl:order-3 flex items-center gap-4 ml-auto mb-2 basis-[215px] flex-shrink-0"
      >
        <TimezoneInfo class="ml-auto z-[1]" />

        <ProfileDropdown />
      </div>

<!--      <div-->
<!--        v-if="showReloadPageSection || impersonatedUserEmail"-->
<!--        class="xl:order-2 flex flex-wrap items-center gap-4 mx-auto z-[1] pl-4"-->
<!--      >-->
<!--        <div-->
<!--          v-if="showReloadPageSection"-->
<!--          class="border-2 border-success box px-4 py-1"-->
<!--        >-->
<!--          <span class="mr-8 text-xl text-success">-->
<!--            Iznākusi jauna sistēmas versija! Lūdzu atjaunojiet lapu!-->
<!--          </span>-->
<!--          <button class="btn btn-primary text-lg" @click="reloadPage">-->
<!--            Atjaunot-->
<!--          </button>-->
<!--        </div>-->

<!--        <div v-if="impersonatedUserEmail" class="py-2 px-4 rounded-md bg-white">-->
<!--          <button class="btn btn-primary" @click="handleStopImpersonation">-->
<!--            Beigt uzdoties par lietotāju-->
<!--            {{ impersonatedUserEmail }}-->
<!--          </button>-->
<!--        </div>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useHeartbeat } from './heartbeat'
// import {
//   impersonatedUserEmail,
//   stopImpersonation,
// } from '../../Mixins/Impersonation'
import Button from '../../Partials/Button.vue'
import { useRouter } from 'vue-router'
// import { useAuthorization } from '../../Stores/authorization'
import { useMenu } from '../../Stores/menu'
import Breadcrumbs from './Breadcrumbs.vue'
import TimezoneInfo from './TimezoneInfo.vue'
import ProfileDropdown from './ProfileDropdown.vue'

const router = useRouter()
// const authorizationStore = useAuthorization()
const menuStore = useMenu()

const reloadPage = () => window.location.reload()

const { showReloadPageSection } = useHeartbeat()

onMounted(() => {
  menuStore.loadMenu()
})

// const handleStopImpersonation = () => {
//   stopImpersonation()
//   router.currentRoute.value.name === 'CUSTOMERS'
//     ? router.push({ name: 'USERS' })
//     : router.push({ name: 'CUSTOMERS' })
// }
</script>

<style lang="scss">
.logo__image {
  width: 180px;
}
</style>
