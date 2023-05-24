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
            @click="showNewUserModal = true"
        >
          Izveidot lietotāju
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
        :delete="false"
        :page="tablePage"
        :page-size="tablePageSize"
        page-size-param="perPage"
        :primary-field="primaryFieldName"
        @edit-click="onEdit"
        @pagination-changed="updateQueryParams"
        @set:filters="setFilters"
    />
    <Loader v-if="!filters" />
  </div>

  <UserFormModal
    v-if="showNewUserModal || editUserIri"
    :iri="editUserIri"
    @close="closeFormModal"
    @success="() => tabulator.refreshData()"
  />
</template>

<script setup lang="ts">
import Table from 'wd-frontend-shared/components/Table/Main.vue'
import Filters from 'wd-frontend-shared/components/Table/Filters.vue'
import UserFormModal from '../Components/Forms/UserFormModal.vue'
import { ref } from 'vue'
import { createColumn } from 'wd-frontend-shared/components/Table/Column'
import { User } from '../Types/User'
import { useRouter } from 'vue-router'
import { impersonate } from '../Mixins/Impersonation'
import { currentIdentity } from '../Mixins/Auth'
import Loader from '../Partials/Loader.vue'
import useTableData from './useTableData'
import tableConfig, { toggleCollapseColumn } from './tableConfig'
import l from '../Labels/Labels'
import { dateTimeFormatter } from '../Helpers/DateTime'
import RestrictedSection from '../Components/Common/RestrictedSection.vue'

const router = useRouter()

const {
  tablePage,
  tablePageSize,
  updateQueryParams,
  setFilters,
  filters,
  ajaxUrl,
  primaryFieldName,
  tabulator,
  setFilterQuery,
} = useTableData<'users'>('api/users?groups[]=classifier:read', 'email')

const columns = [
  toggleCollapseColumn,
  createColumn({
    title: l('common', 'email', 'upper'),
    field: 'email',
    width: 200,
  }),
  createColumn({
    title: l('common', 'firstName', 'upper'),
    field: 'firstName',
    width: 200,
    minWidth: 100,
  }),
  createColumn({
    title: l('common', 'lastName', 'upper'),
    field: 'lastName',
    width: 200,
    minWidth: 100,
  }),
  createColumn({
    title: l('user', 'role', 'upper'),
    field: 'role',
    width: 200,
    formatter(cell) {
      return cell.getValue()
    },
    headerSort: false,
  }),
  createColumn({
    title: l('common', 'phone', 'upper'),
    field: 'phone',
    width: 100,
  }),
  createColumn({
    title: 'UZDOTIES PAR',
    field: 'impersonate',
    formatter(cell: any) {
      const user = cell.getData() as User
      if (user.id === currentIdentity.value?.userId) return ''
      const btn = document.createElement('BUTTON')
      btn.classList.add('btn', 'btn-primary', 'btn-sm', 'mx-auto')
      btn.title = 'Uzdoties par šo lietotāju'
      btn.dataset.test = 'impersonate-user-btn'
      btn.innerHTML = '<i data-lucide="user-plus" class="w-4 h-4"></i>'
      btn.addEventListener('click', async function (this: HTMLButtonElement) {
        this.disabled = true

        try {
          await impersonate(user.email)
        } catch (e) {
          console.log(e)
        }
      })
      return btn
    },
    vertAlign: 'middle',
    width: 80,
    headerSort: false,
  }),
]

const showNewUserModal = ref(false)
const editUserIri = ref<User['@id'] | null>(null)

const onEdit = async (user: User) => (editUserIri.value = user['@id'])

const closeFormModal = () => {
  if (editUserIri.value) editUserIri.value = null
  else showNewUserModal.value = false
}
</script>
