<template>
  <div class="box intro-y mt-4 p-5">
    <Filters
      v-if="filters"
      :config="tableConfig"
      :filters="filters"
      @update:query-params="setFilterQuery"
    >
      <div class="mt-4 sm:mt-0">
        <button
          class="btn btn-primary mr-2 shadow-md sm:w-auto w-full"
          type="button"
          @click="showNewClassifierModal = true"
        >
          Izveidot klasifikatoru
        </button>
      </div>
    </Filters>
    <Table
      v-if="ajaxUrl"
      v-show="filters"
      ref="tabulator"
      :ajax-url="ajaxUrl"
      :columns="columns"
      :config="tableConfig"
      :delete="true"
      :edit="true"
      :page="tablePage"
      :page-size="tablePageSize"
      page-size-param="perPage"
      :primary-field="primaryFieldName"
      @delete-click="openConfirmationModal"
      @edit-click="onEdit"
      @pagination-changed="updateQueryParams"
      @set:filters="setFilters"
    />
    <Loader v-if="!filters" />
  </div>

  <ClassifierFormModal
    v-if="showNewClassifierModal || editClassifierIri"
    :iri="editClassifierIri"
    @close="closeFormModal"
    @success="() => tabulator.refreshData()"
  />
  <ConfirmationModal
    v-if="recordToDelete"
    :title="confirmTitle"
    @close="recordToDelete = null"
    @confirm="deleteRecord"
  />
</template>

<script setup lang="ts">
import Table from 'wd-frontend-shared/components/Table/Main.vue'
import Filters from 'wd-frontend-shared/components/Table/Filters.vue'
import ConfirmationModal from '../Components/ConfirmationModal.vue'
import ClassifierFormModal from '../Components/Forms/ClassifierFormModal.vue'
import { ref } from 'vue'
import { Classifier, classifierTypeToLabel } from '../Types/Classifier'
import Loader from '../Partials/Loader.vue'
import useTableData from './useTableData'
import { createColumn } from 'wd-frontend-shared/components/Table/Column'
import l from '../Labels/Labels'
import tableConfig, { toggleCollapseColumn } from './tableConfig'

const {
  tablePage,
  tablePageSize,
  updateQueryParams,
  setFilters,
  deleteRecord,
  confirmTitle,
  openConfirmationModal,
  filters,
  recordToDelete,
  ajaxUrl,
  primaryFieldName,
  tabulator,
  setFilterQuery,
} = useTableData<'classifiers'>('/api/classifiers', 'value')

const columns = [
  toggleCollapseColumn,
  createColumn({
    title: l('common', 'value', 'upper'),
    field: 'value',
    minWidth: 150,
  }),
  createColumn({
    title: l('common', 'type', 'upper'),
    field: 'type',
    width: 100,
    formatter(cell) {
      return classifierTypeToLabel(cell.getValue())
    },
  }),
]

const showNewClassifierModal = ref(false)
const editClassifierIri = ref<Classifier['@id'] | null>(null)

const onEdit = async (classifier: Classifier) => {
  editClassifierIri.value = classifier['@id']
}

const closeFormModal = () => {
  if (editClassifierIri.value) editClassifierIri.value = null
  else showNewClassifierModal.value = false
}
</script>
