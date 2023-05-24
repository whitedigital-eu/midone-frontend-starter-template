<template>
  <Modal data-test="profile-form-modal" @close="emit('close')">
    <template #header>
      <h2 class="font-medium mr-auto text-base">Rediģēt profilu</h2>
    </template>
    <template #body>
      <form class="mb-4" @submit.prevent="createOrUpdate">
        <GridForm
          v-if="formData"
          :cols="1"
          :form-data="formData"
          :form-layout="formLayout"
        />
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
import { ref } from 'vue'
import { setFormDataErrors } from 'wd-frontend-shared/helpers/Errors'
import CrudFormModalFooter from '../../Partials/Modal/CrudFormModalFooter.vue'
import useProfileFormData from './useProfileFormData'
import { User } from '../../Types/User'
import UserRepository from '../../Repositories/UserRepository'
import { PostType } from '../../Types/Resource'
import {getFormFieldValues} from "../../Helpers/Global";

const props = defineProps<{
  iri: User['@id']
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'success'): void
}>()

const { formData, formLayout } = useProfileFormData(props.iri)

const isLoading = ref(false)

const createOrUpdate = async () => {
  if (!formData.value) {
    console.error(
      `formData.value must be truthy when submitting form! formData.value: ${formData.value}`
    )
    return
  }

  const data = getFormFieldValues(formData.value!)

  isLoading.value = true

  try {
    await UserRepository.createOrUpdate(props.iri, data)
    emit('success')
    emit('close')
  } catch (e: any) {
    setFormDataErrors(e, formData.value)
  } finally {
    isLoading.value = false
  }
}
</script>
