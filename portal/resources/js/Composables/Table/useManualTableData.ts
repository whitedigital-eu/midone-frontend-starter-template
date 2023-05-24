import { ref, watch } from 'vue'
import { AnyResourceString, GetType } from '../../Types/Resource'
import useTableDataShared from './useTableDataShared'
import baseAxios from '../../Mixins/DataFetching'

export default function useManualTableData<
  ResourceString extends AnyResourceString
>(
  baseUrl: string,
  primaryFieldName: string,
  transformResponseFunc: (
    resources: GetType<ResourceString>[]
  ) => any[] | Promise<any[]>
) {
  const {
    tablePage,
    tablePageSize,
    updateQueryParams,
    setFilters,
    confirmTitle,
    openConfirmationModal,
    filters,
    recordToDelete,
    ajaxUrl,
    tabulator,
    setFilterQuery,
    setBaseUrl,
    filterParams,
  } = useTableDataShared<ResourceString>(baseUrl, primaryFieldName)

  const columnData = ref<any[] | null>(null)
  const loadTableData = async () => {
    if (!ajaxUrl.value) return
    try {
      const res = (await baseAxios.get(ajaxUrl.value)).data
      columnData.value = await transformResponseFunc(res['hydra:member'])
      if (!filters.value) await setFilters(res)
    } catch (e) {
      console.error(e)
    }
  }

  const deleteRecord = async () => {
    try {
      await baseAxios.delete(recordToDelete.value!)
      await loadTableData()
    } finally {
      recordToDelete.value = null
    }
  }

  watch(ajaxUrl, loadTableData, { immediate: true })

  return {
    setFilters,
    columnData,
    tablePage,
    tablePageSize,
    updateQueryParams,
    deleteRecord,
    confirmTitle,
    openConfirmationModal,
    filters,
    recordToDelete,
    primaryFieldName,
    tabulator,
    loadTableData,
    setFilterQuery,
    setBaseUrl,
    filterParams,
  }
}
