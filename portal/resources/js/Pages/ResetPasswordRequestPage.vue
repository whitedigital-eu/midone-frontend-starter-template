<template>
  <h2 class="text-3xl text-center">Paroles atjaunošana</h2>
  <div class="my-4">
    <form
      v-if="!showSuccessMessage"
      @submit.prevent="submitPasswordResetRequest"
    >
      <h4 class="text-lg">
        Lai atjaunotu savu paroli, lūdzu norādiet e-pastu un sekojiet saņemtajām
        norādēm.
      </h4>
      <div class="mt-4">
        <Text v-model="email" label="E-pasts" />
        <ul v-if="emailError" class="mt-2">
          <li class="mb-4 text-danger">{{ emailError }}</li>
        </ul>
      </div>
    </form>
    <div
      v-else
      class="lg:w-2/4 m-auto px-5 py-8 sm:px-8 sm:w-3/4 text-success text-xl w-full xl:bg-transparent xl:p-0 xl:w-auto"
    >
      Uz jūsu e-pastu nosūtītas instrukcijas paroles atjaunošanai.
    </div>
  </div>
  <div class="text-center">
    <router-link class="btn btn-secondary mr-8" :to="{ name: 'LOGIN' }">
      Atgriezties
    </router-link>
    <Button
      v-if="!showSuccessMessage"
      :loading="isLoading"
      @click="submitPasswordResetRequest"
    >
      Turpināt
    </Button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from '../Partials/Buttons/Button.vue'
import Text from 'wd-frontend-shared/components/Inputs/Text.vue'
import axios from 'axios'
import baseAxios from '../Mixins/DataFetching'

const email = ref<null | string>(null)
const emailError = ref<string | null>(null)
const showSuccessMessage = ref(false)
const isLoading = ref(false)

const submitPasswordResetRequest = async () => {
  isLoading.value = true
  try {
    await baseAxios.post('/api/reset-password-requests', {
      email: email.value,
    })
    showSuccessMessage.value = true
  } catch (e) {
    if (axios.isAxiosError(e) && e.response?.status === 422) {
      emailError.value = (e.response.data as any).violations[0].message
    }
  } finally {
    isLoading.value = false
  }
}
</script>
