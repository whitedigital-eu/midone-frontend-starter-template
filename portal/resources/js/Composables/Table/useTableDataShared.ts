import { computed, ref } from 'vue'
import { AnyResourceString, IriString } from '../../Types/Resource'
import { LocationQueryValue, useRoute, useRouter } from 'vue-router'
import Filter from '../../Models/Filters'
import { Filters } from 'wd-frontend-shared/types/Filters'
import baseAxios from '../../Mixins/DataFetching'

export default function useTableDataShared<
  ResourceString extends AnyResourceString
>(baseUrl, primaryFieldName) {
  const route = useRoute()
  const router = useRouter()

  const baseUrlRef = ref(baseUrl)
  const tabulator = ref()
  const filters = ref<Filters | null>(null)
  const filterParams = ref({})
  const columnData = ref<any[] | null>(null)

  const setBaseUrl = (url: string) => (baseUrlRef.value = url)

  const ajaxUrl = computed(() => {
    if (!baseUrlRef.value) return undefined
    const separator = baseUrlRef.value.includes('?') ? `&` : '?'
    const filterQueryString = new URLSearchParams(filterParams.value).toString()

    return `${baseUrlRef.value}${separator}${filterQueryString}`
  })

  const loadTableData = async () => {
    if (!ajaxUrl.value) return
    try {
      const res = (await baseAxios.get(ajaxUrl.value)).data
      columnData.value = res['hydra:member']
      if (!filters.value) await setFilters(res)
    } catch (e) {
      console.error(e)
    }
  }

  const setFilterQuery = (data: Record<string, string | string[] | number>) => {
    filterParams.value = data

    const newQuery: typeof filterParams.value & {
      page?: LocationQueryValue
      size?: LocationQueryValue
    } = { ...filterParams.value }
    if (router.currentRoute.value.query.size) {
      newQuery.page = router.currentRoute.value.query.page as LocationQueryValue
    }
    if (router.currentRoute.value.query.size) {
      newQuery.size = router.currentRoute.value.query.size as LocationQueryValue
    }

    router.push({
      path: router.currentRoute.value.path,
      query: newQuery,
    })
  }

  const tablePage =
    typeof route.query.page === 'string'
      ? parseInt(route.query.page)
      : undefined
  const tablePageSize =
    typeof route.query.size === 'string'
      ? parseInt(route.query.size)
      : undefined

  const updateQueryParams = (page: number, size: number) => {
    router.replace({
      path: router.currentRoute.value.path,
      query: { ...router.currentRoute.value.query, page, size },
    })
  }

  const setFilters = async (res: any) => {
    filters.value = await Filter.createFromApiResponse(res)
  }

  const recordToDelete = ref<IriString<ResourceString> | null>(null)

  const confirmTitle = ref()

  const openConfirmationModal = (record: any) => {
    confirmTitle.value = record[primaryFieldName]
    // @ts-ignore
    recordToDelete.value = record['@id']
  }

  return {
    columnData,
    tablePage,
    tablePageSize,
    updateQueryParams,
    confirmTitle,
    openConfirmationModal,
    filters,
    recordToDelete,
    primaryFieldName,
    tabulator,
    loadTableData,
    setFilterQuery,
    setFilters,
    ajaxUrl,
    setBaseUrl,
    filterParams,
  }
}
