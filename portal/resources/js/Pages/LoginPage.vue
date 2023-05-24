<template>
  <h2 class="font-bold intro-x text-2xl text-center xl:text-3xl xl:text-left">
    Autorizēties
  </h2>
  <div class="intro-x mt-8">
    <form>
      <input
        v-model="email"
        class="block form-control intro-x login__input px-4 py-3"
        placeholder="E-pasts"
        type="text"
        @keydown.enter="submitLogin"
      />
      <input
        v-model="password"
        class="block form-control intro-x login__input mt-4 px-4 py-3"
        placeholder="Parole"
        type="password"
        @keydown.enter="submitLogin"
      />
    </form>
  </div>
  <div class="flex justify-between mt-4">
    <Button
      class="btn btn-primary px-4 py-3 w-full xl:mr-3 xl:w-32"
      :loading="isLoading"
      @click="submitLogin"
    >
      Pieslēgties
    </Button>
    <router-link
      class="dark:text-slate-500 mt-4 sm:text-sm text-slate-600 text-xs"
      :to="{ name: 'PASSWORD_RESET_REQUEST' }"
    >
      Aizmirsi e-pastu vai paroli?
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { authenticate } from '../Mixins/Auth'
import Button from '../Partials/Buttons/Button.vue'

const email = ref('')
const password = ref('')

const isLoading = ref(false)

const submitLogin = async () => {
  isLoading.value = true
  await authenticate(email.value, password.value)
  isLoading.value = false
}
</script>
