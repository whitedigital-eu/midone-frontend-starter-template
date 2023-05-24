<template>
  <Modal
    body-class="min-h-[250px]"
    data-test="classifier-form-modal"
    @close="emit('close')"
  >
    <template #header>
      <h2 class="font-medium mr-auto text-base">{{ titleText }}</h2>
    </template>
    <template #body>
      <form class="mb-4" @submit.prevent="createOrUpdate">
        <GridForm
          v-if="!waitForData"
          :cols="1"
          :form-data="formData"
          :form-layout="formLayout"
        />
        <Loader v-else />
      </form>
    </template>
    <template #footer>
      <CrudFormModalFooter
        v-if="!waitForData"
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
import { computed, onMounted, ref } from 'vue'
import { setFormDataErrors } from 'wd-frontend-shared/helpers/Errors'
import {
  SimpleSelectFieldTS,
  TextField,
} from 'wd-frontend-shared/models/FormFields'
import {
  Classifier,
  ClassifierType,
  ClassifierPost,
} from '../../Types/Classifier'
import CrudFormModalFooter from '../../Partials/Modal/CrudFormModalFooter.vue'
import { classifierTypeSelectOptions } from '../../Mixins/FormUtilities'
import ClassifierRepository from '../../Repositories/ClassifierRepository'
import {getFormFieldValues} from "../../Helpers/Global";

const props = defineProps<{ iri: Classifier['@id'] | null }>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'success'): void
}>()

const classifierDataLoaded = ref(false)
const isLoading = ref(false)

const waitForData = computed(() => {
  return props.iri && !classifierDataLoaded.value
})

const titleText = computed(() =>
  props.iri ? 'Rediģēt klasifikatoru' : 'Izveidot klasifikatoru'
)

const formData = ref({
  value: new TextField('value', 'Vērtība', ''),
  type: new SimpleSelectFieldTS<ClassifierType>(
    'type',
    'Tips',
    null,
    []
  ),
})

const formLayout = [['value', 'type']]

const loadClassifier = async () => {
  if (!props.iri) return
  const classifier = await ClassifierRepository.get(props.iri)

  for (const key in classifier) {
    if (key in formData.value) {
      //@ts-ignore
      formData.value[key].value = classifier[key as keyof typeof classifier]
    }
  }
  formData.value['type'].readonly = true
  classifierDataLoaded.value = true
}

const createOrUpdate = async () => {
  const data: ClassifierPost = getFormFieldValues(formData.value)
  isLoading.value = true

  try {
    await ClassifierRepository.createOrUpdate(props.iri, data)
    emit('success')
    emit('close')
  } catch (e) {
    setFormDataErrors(e, formData.value)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  if (props.iri) loadClassifier()
})
</script>
