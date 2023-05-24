import { AnyResourceString } from '../../Types/Resource'
import useTableDataShared from './useTableDataShared'
import baseAxios from '../../Mixins/DataFetching'

export default function useAutomaticTableData<
  ResourceString extends AnyResourceString
>(baseUrl, primaryFieldName) {
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
  } = useTableDataShared<ResourceString>(baseUrl, primaryFieldName)

  const deleteRecord = async () => {
    try {
      await baseAxios.delete(recordToDelete.value!)
      tabulator.value.refreshData()
    } finally {
      recordToDelete.value = null
    }
  }

  return {
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
    setBaseUrl,
  }
}
