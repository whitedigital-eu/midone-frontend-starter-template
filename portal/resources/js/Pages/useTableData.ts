import { computed, ref } from 'vue'
import { GetType, Resources, IriString } from '../Types/Resource'
import { LocationQueryValue, useRoute, useRouter } from 'vue-router'
import Filter from '../Models/Filters'
import { Filters } from 'wd-frontend-shared/types/Filters'
import baseAxios from '../Mixins/DataFetching'

export default function useTableData<X extends keyof Resources>(
  baseUrl: string | null,
  primaryFieldName: keyof GetType<X>
) {
  const route = useRoute()
  const router = useRouter()

  const baseUrlRef = ref(baseUrl)

  const setBaseUrl = (url: string) => (baseUrlRef.value = url)

  const ajaxUrl = computed(() => {
    if (!baseUrlRef.value) return undefined
    const separator = baseUrlRef.value.includes('?') ? `&` : '?'
    const urlSearchParams = new URLSearchParams()
    for (const [key, value] of Object.entries(filterParams.value)) {
      if (
        Array.isArray(value) &&
        (key.includes('[ipartial]') || key.includes('[exact]'))
      ) {
        value.forEach((v) => urlSearchParams.append(`${key}[]`, v))
      } else urlSearchParams.set(key, value as any)
    }
    const filterQueryString = urlSearchParams.toString()

    return `${baseUrlRef.value}${separator}${filterQueryString}`
  })
  const tabulator = ref()
  const filters = ref<Filters | null>(null)
  const filterParams = ref({})

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
    typeof route.query.perPage === 'string'
      ? parseInt(route.query.perPage)
      : undefined

  const updateQueryParams = (page: number, size: number) => {
    const { page: oldPageString, size: oldSizeString } =
      router.currentRoute.value.query
    const paramsChanged =
      typeof oldPageString !== 'string' ||
      typeof oldSizeString !== 'string' ||
      page !== parseInt(oldPageString) ||
      size !== parseInt(oldSizeString)

    if (paramsChanged) {
      router.replace({
        path: router.currentRoute.value.path,
        query: { ...router.currentRoute.value.query, page, size },
      })
    }
  }

  const setFilters = async (res: any) => {
    filters.value = await Filter.createFromApiResponse(res)
  }

  const recordToDelete = ref<IriString<X> | null>(null)

  const deleteRecord = async () => {
    try {
      await baseAxios.delete(recordToDelete.value!)
    } finally {
      recordToDelete.value = null
      tabulator.value.refreshData()
    }
  }

  const confirmTitle = ref()

  const openConfirmationModal = (record: GetType<X>) => {
    confirmTitle.value = record[primaryFieldName]
    // @ts-ignore
    recordToDelete.value = record['@id']
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
    filterParams,
  }
}
