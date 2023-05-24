<template>
  <div>
    <div class="container sm:px-10">
      <div class="block gap-4 grid-cols-2 xl:grid">
        <div class="flex-col hidden min-h-screen xl:flex"></div>
        <div
          class="flex h-screen mob-login-logo my-10 py-5 xl:h-auto xl:my-0 xl:py-0"
        >
          <div
            class="bg-white dark:bg-darkmode-600 lg:w-2/4 mx-auto my-auto px-5 py-8 rounded-md shadow-md sm:px-8 sm:w-3/4 w-full xl:bg-transparent xl:ml-20 xl:p-0 xl:pb-8 xl:shadow-none xl:w-auto"
          >
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
//@ts-ignore
import dom from '@left4code/tw-starter/dist/js/dom'

onMounted(() => {
  dom('body').removeClass('main').removeClass('error-page').addClass('login')
})
</script>

<style scoped lang="scss">
@media (max-width: 1280px) {
  .mob-login-logo {
    /* TODO: add correct logo source */
    //background: url('/images/logos/...') no-repeat 50% 0;
    background-size: 100%;
  }
}
</style>
