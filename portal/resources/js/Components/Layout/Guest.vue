<template>
  <div>
    <div class="container sm:px-10">
      <div class="block xl:grid grid-cols-2 gap-4">
        <div class="hidden xl:flex flex-col min-h-screen"></div>
        <div
          class="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0 mob-login-logo"
        >
          <div
            class="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 xl:pb-8 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto"
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
    background: url('/images/logos/inverss.png') no-repeat 50% 0;
    background-size: 100%;
  }
}
</style>
