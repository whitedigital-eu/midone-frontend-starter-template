<template>
  <Loader v-if="!route.name" class="mt-40" />
  <UserLayout v-else-if="showUserLayout" />
  <GuestLayout v-else />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import GuestLayout from './Components/Layout/Guest.vue'
import UserLayout from './Components/Layout/User.vue'
import Loader from './Partials/Loader.vue'
import { guestRouteNames, ROUTE_NAME } from './routes'

const route = useRoute()

const showUserLayout = computed(
  () => route.name && !guestRouteNames.includes(route.name as ROUTE_NAME)
)
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
