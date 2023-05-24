<template>
  <Modal data-test="user-form-modal" size="xl" @close="emit('close')">
    <template #header>
      <h2 class="font-medium mr-auto text-base">{{ titleText }}</h2>
    </template>
    <template #body>
      <form class="mb-4" @submit.prevent="createOrUpdate">
          <GridForm v-if="formData" :form-data="formData" :form-layout="formLayout" />
        <Loader v-else />
      </form>
    </template>
    <template #footer>
      <CrudFormModalFooter
        v-if="formData"
        :iri="iri"
        :is-loading="isLoading"
        @cancel-click="emit('close')"
        @proceed-click="createOrUpdate"
      />
    </template>
  </Modal>
</template>

<script setup lang="ts">
import GridForm from '../../Partials/Forms/GridForm.vue'
import Modal from '../../Partials/Modal/Modal.vue'
import Loader from '../../Partials/Loader.vue'
import { computed, ref } from 'vue'
import {getFormFieldValues, logFdError} from '../../Helpers/Global'
import { setFormDataErrors } from 'wd-frontend-shared/helpers/Errors'
import CrudFormModalFooter from '../../Partials/Modal/CrudFormModalFooter.vue'
import useUserFormData from './useUserFormData'
import { User, UserPost } from '../../Types/User'
import UserRepository from '../../Repositories/UserRepository'
import { guidIriStringToId } from '../../Mixins/DataFetching'

const props = defineProps<{
  iri: User['@id'] | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'success'): void
}>()

const { formData, formLayout } = useUserFormData(props.iri)

const isLoading = ref(false)

const titleText = computed(() =>
  props.iri ? 'Rediģēt lietotāju' : 'Izveidot lietotāju'
)

const userId = computed(() => (props.iri ? guidIriStringToId(props.iri) : null))

const createOrUpdate = async () => {
  if (!formData.value) {
    logFdError(formData)
    return
  }

  const data = getFormFieldValues(formData.value!) as UserPost
  isLoading.value = true

  try {
    await UserRepository.createOrUpdate(props.iri, data)
    emit('success')
    emit('close')
  } catch (e: any) {
    setFormDataErrors(e, formData.value!)
  } finally {
    isLoading.value = false
  }
}
</script>
