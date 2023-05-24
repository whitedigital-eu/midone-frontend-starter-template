<template>
  <main class="password-reset">
    <div class="container sm:px-10">
      <div class="block">
        <div class="flex min-h-screen my-10 py-5 xl:h-auto xl:my-0 xl:py-0">
          <form
            v-if="!showSuccessMessage"
            class="bg-white dark:bg-darkmode-600 lg:w-2/4 m-auto px-5 py-8 rounded-md shadow-md sm:px-8 sm:w-3/4 w-full xl:bg-transparent xl:p-0 xl:shadow-none xl:w-auto"
            @submit.prevent="submitPasswordReset"
          >
            <h4
              class="font-bold intro-x text-center text-l xl:text-left xl:text-xl"
            >
              Lūdzu izveidojiet jaunu paroli.
            </h4>
            <div class="intro-x mt-8">
              <input
                v-model="password"
                autocomplete="new-password"
                class="block form-control intro-x login__input mt-4 px-4 py-3"
                placeholder="Jaunā parole"
                type="password"
              />
              <div
                v-for="(message, i) in errors.password"
                :key="i"
                class="mt-2 text-danger"
              >
                {{ message }}
              </div>
              <input
                v-model="repeatedPassword"
                autocomplete="new-password"
                class="block form-control intro-x login__input mt-4 px-4 py-3"
                placeholder="Jaunā parole atkārtoti"
                type="password"
              />
              <div
                v-for="(message, i) in errors.repeatedPassword"
                :key="i"
                class="mt-2 text-danger"
              >
                {{ message }}
              </div>
            </div>
            <div class="intro-x mt-5 text-center xl:mt-8 xl:text-left">
              <Button class="py-3" :loading="isLoading">Turpināt</Button>
            </div>
          </form>
          <div
            v-else
            class="lg:w-2/4 m-auto px-5 py-8 sm:px-8 sm:w-3/4 text-success text-xl w-full xl:bg-transparent xl:p-0 xl:w-auto"
          >
            Lietotājam {{ userEmail }} paroles maiņa veiksmīga, lūdzu
            <router-link class="btn btn-success" :to="{ name: 'LOGIN' }">
              pieslēgties
            </router-link>
            sistēmai ar jauno paroli.
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Router, useRouter } from 'vue-router'
import Button from '../Partials/Buttons/Button.vue'
import { defaultWriteConfig } from '../Helpers/Global'
import baseAxios from '../Mixins/DataFetching'

const props = defineProps<{ token: string }>()

const router: Router = useRouter()

const password = ref<string>('')
const repeatedPassword = ref<string>('')

const showSuccessMessage = ref(false)
const userEmail = ref<string | null>(null)

const errors = ref<{ [key: string]: string[] }>({
  password: [],
  repeatedPassword: [],
})

const isLoading = ref(false)

const resetErrors = () => {
  errors.value = {
    password: [],
    repeatedPassword: [],
  }
}

const submitPasswordReset = async () => {
  resetErrors()
  isLoading.value = true

  try {
    const res = await baseAxios.patch(
      `/api/reset-password-requests/${props.token}`,
      {
        newPassword: password.value,
        newPasswordRepeat: repeatedPassword.value,
      },
      defaultWriteConfig
    )
    userEmail.value = res.data.email
    showSuccessMessage.value = true
  } catch (e: any) {
    const status: number = e.response.status

    if (status === 500) {
      await router.push({ name: 'LOGIN' })
    } else if (status === 422) {
      e.response.data.violations.forEach((violation: any) => {
        const errorKey: string =
          violation.propertyPath === 'newPassword'
            ? 'password'
            : 'repeatedPassword'

        errors.value[errorKey].push(violation.message)
      })
    }
  } finally {
    isLoading.value = false
  }
}

watch(password, () => (errors.value.password = []))
watch(repeatedPassword, () => (errors.value.password = []))
</script>

<style scoped lang="scss">
.password-reset {
  background: white;
  height: 100%;
}
</style>
