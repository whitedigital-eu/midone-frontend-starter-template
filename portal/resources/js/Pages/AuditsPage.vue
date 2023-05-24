<template>
  <main class="audits">
    <div class="box intro-y mt-4 p-5">
      <Filters
          v-if="filters"
          :config="tableConfig"
          :filters="filters"
          @update:query-params="setFilterQuery"
      />
      <Table
          v-if="ajaxUrl"
          v-show="filters"
          ref="tabulator"
          :ajax-url="ajaxUrl"
          :columns="columns"
          :config="tableConfig"
          :delete="false"
          :edit="false"
          :page="tablePage"
          :page-size="tablePageSize"
          page-size-param="perPage"
          :updated="false"
          view
          @pagination-changed="updateQueryParams"
          @set:filters="setFilters"
          @view-click="handleViewClick"
      />
      <Loader v-if="!filters" />
    </div>

    <Modal
      v-if="openAuditIri"
      class="audits-modal"
      data-test="audit-modal"
      size="xl"
      @close="openAuditIri = null"
    >
      <template #header>
        <h2 v-if="audit" class="font-medium mr-auto text-base">
          {{ audit.message }}
        </h2>
      </template>
      <template #body>
        <div v-if="audit">
          <pre v-html="syntaxHighlight(audit.data)"></pre>
        </div>
        <Loader v-else />
      </template>
    </Modal>
  </main>
</template>

<script setup lang="ts">
import Table from 'wd-frontend-shared/components/Table/Main.vue'
import Filters from 'wd-frontend-shared/components/Table/Filters.vue'
import Loader from '../Partials/Loader.vue'
import Modal from '../Partials/Modal/Modal.vue'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { Audit } from '../Types/Audit'
import { syntaxHighlight } from 'wd-frontend-shared/helpers/Global'
import useTableData from './useTableData'
import tableConfig, { toggleCollapseColumn } from './tableConfig'
import { createColumn } from 'wd-frontend-shared/components/Table/Column'
import l from '../Labels/Labels'
import RestrictedSection from '../Components/Common/RestrictedSection.vue'
import AuditRepository from "../Repositories/AuditRepository";

const {
  tablePage,
  tablePageSize,
  updateQueryParams,
  setFilters,
  filters,
  ajaxUrl,
  tabulator,
  setFilterQuery,
} = useTableData<'audits'>('/api/audits', 'category')

const modalRef = ref()
const openAuditIri = ref<Audit['@id'] | null>()

watch(openAuditIri, async (newVal) => {
  audit.value = newVal ? await AuditRepository.get(newVal) : null
})

const audit = ref<Audit | null>(null)

const columns = [
  toggleCollapseColumn,
  createColumn({
    title: l('audit', 'userIdentifier', 'upper'),
    field: 'userIdentifier',
    width: 200,
  }),
  createColumn({
    title: l('audit', 'ipAddress', 'upper'),
    field: 'ipAddress',
    width: 110,
    headerSort: false,
  }),
  createColumn({
    title: l('audit', 'category', 'upper'),
    field: 'category',
    minWidth: 150,
    width: 300,
  }),
  createColumn({
    title: l('audit', 'message', 'upper'),
    field: 'message',
    minWidth: 200,
    formatter: 'textarea',
  }),
]

const handleViewClick = async (audit: Audit) => {
  openAuditIri.value = audit['@id']
}

onMounted(() => document.addEventListener('click', handleDocumentClick))
onUnmounted(() => document.removeEventListener('click', handleDocumentClick))

const handleDocumentClick = (e: Event) => {
  const clickedOnModalOverlay = e.target === modalRef.value
  if (clickedOnModalOverlay) {
    openAuditIri.value = null
  }
}
</script>

<style lang="scss">
.audits-modal {
  pre {
    outline: 1px solid #ccc;
    padding: 5px;
    margin: 5px;
    word-wrap: break-word;
    white-space: break-spaces;
  }

  .string {
    color: #157f01;
  }

  .number {
    color: #1d1dff;
  }

  .boolean {
    color: darkorange;
  }

  .null {
    color: magenta;
  }

  .key {
    color: #8c0a6f;
  }
}
</style>
