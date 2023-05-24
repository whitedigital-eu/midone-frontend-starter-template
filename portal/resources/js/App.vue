<template>
  <Loader
    v-if="!route.name"
    class="mt-40"
  />
  <UserLayout v-else-if="showUserLayout" />
  <GuestLayout v-else />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, ref, watch } from 'vue'
import GuestLayout from './Components/Layout/GuestLayout.vue'
import UserLayout from './Components/Layout/UserLayout.vue'
import Loader from './Partials/Loader.vue'
import { guestRouteNames, ROUTE_NAME } from './routes'
import { currentIdentity } from './Mixins/Auth'
import { useMenu } from './Stores/menu'

const route = useRoute()
const menuStore = useMenu()

const showUserLayout = computed(
  () => route.name && !guestRouteNames.includes(route.name as ROUTE_NAME)
)
const authorizationDataLoaded = computed(
  () => !!menuStore.menu
)

const onUserLayoutShown = async () => {
  await menuStore.loadMenu()
}


watch(
  currentIdentity,
  (n, o) => {
    if (!showUserLayout.value) return
    if (n && (!o || n.impersonator !== o?.impersonator || n.user !== o?.user)) {
      onUserLayoutShown()
    }
  },
  { immediate: true }
)

watch(showUserLayout, (n) => {
  if (n) onUserLayoutShown()
})
</script>

<style lang="scss">
html body {
  margin: 0;
}

body {
  @media (min-width: 768px) {
    padding: 0;
  }
}

main {
  @media (min-width: 768px) {
    padding: 0 1rem;
  }
}

.content {
  margin: 1rem 0;
}
</style>
