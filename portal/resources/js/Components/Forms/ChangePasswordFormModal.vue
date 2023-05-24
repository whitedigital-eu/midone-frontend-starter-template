<template>
  <Modal @close="emit('close')">
    <template #header>
      <h2 class="font-medium mr-auto text-base">
        Lūdzu izveidojiet jaunu paroli
      </h2>
    </template>
    <template #body>
      <div class="my-4">
        <form v-if="!showSuccessMessage" @submit.prevent="submitPasswordReset">
          <div class="mt-4">
            <input
              v-model="oldPassword"
              class="block form-control login__input mt-4 px-4 py-3"
              placeholder="Vecā parole"
              type="password"
            />
            <div
              v-for="(message, i) in errors.oldPassword"
              :key="i"
              class="mt-2 text-danger"
            >
              {{ message }}
            </div>
            <input
              v-model="newPassword"
              autocomplete="new-password"
              class="block form-control login__input mt-4 px-4 py-3"
              placeholder="Jaunā parole"
              type="password"
            />
            <div
              v-for="(message, i) in errors.newPassword"
              :key="i"
              class="mt-2 text-danger"
            >
              {{ message }}
            </div>
            <input
              v-model="newPasswordRepeat"
              autocomplete="new-password"
              class="block form-control login__input mt-4 px-4 py-3"
              placeholder="Jaunā parole atkārtoti"
              type="password"
            />
            <div
              v-for="(message, i) in errors.newPasswordRepeat"
              :key="i"
              class="mt-2 text-danger"
            >
              {{ message }}
            </div>
          </div>
        </form>
        <div
          v-else
          class="lg:w-2/4 m-auto px-5 py-8 sm:px-8 sm:w-3/4 text-success text-xl w-full xl:bg-transparent xl:p-0 xl:w-auto"
        >
          Paroles maiņa veiksmīga!
        </div>
      </div>
    </template>
    <template #footer>
      <div class="text-center">
        <Button
          v-if="!showSuccessMessage"
          :loading="isLoading"
          @click="submitPasswordReset"
        >
          Saglabāt
        </Button>
        <button v-else class="btn btn-primary" @click="emit('close')">
          Aizvērt
        </button>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Button from '../../Partials/Buttons/Button.vue'
import { currentIdentity } from '../../Mixins/Auth'
import Modal from '../../Partials/Modal/Modal.vue'
import { defaultWriteConfig } from '../../Helpers/Global'
import baseAxios from '../../Mixins/DataFetching'

const emit = defineEmits<{
  (e: 'close'): void
}>()

const oldPassword = ref('')
const newPassword = ref('')
const newPasswordRepeat = ref('')

const showSuccessMessage = ref(false)

const errors = ref<
  Record<'oldPassword' | 'newPassword' | 'newPasswordRepeat', string[]>
>({
  oldPassword: [],
  newPassword: [],
  newPasswordRepeat: [],
})

const isLoading = ref(false)

const resetErrors = () => {
  errors.value = {
    oldPassword: [],
    newPassword: [],
    newPasswordRepeat: [],
  }
}

const submitPasswordReset = async () => {
  if (!currentIdentity.value) {
    console.error(
      `current user should be defined when trying to change newPassword! currentIdentity.value: ${currentIdentity.value}`
    )
    return
  }

  resetErrors()
  isLoading.value = true

  try {
    await baseAxios.post(
      `/api/password-change-requests`,
      {
        userId: currentIdentity.value.userId,
        oldPassword: oldPassword.value,
        newPassword: newPassword.value,
        newPasswordRepeat: newPasswordRepeat.value,
      },
      defaultWriteConfig
    )
    showSuccessMessage.value = true
  } catch (e: any) {
    const status: number = e.response.status

    if (status === 422) {
      e.response.data.violations.forEach(
        (violation: {
          propertyPath: 'oldPassword' | 'newPassword'
          message: string
        }) => {
          errors.value[violation.propertyPath].push(violation.message)
        }
      )
    }
  } finally {
    isLoading.value = false
  }
}

watch(oldPassword, () => (errors.value.oldPassword = []))
watch(newPassword, () => (errors.value.newPassword = []))
watch(newPasswordRepeat, () => (errors.value.newPassword = []))
</script>
