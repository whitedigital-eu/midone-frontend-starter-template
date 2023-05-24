import {
  DataFetchingSelectConfig,
  SimpleSelectConfig,
} from 'wd-frontend-shared/types/InputFields'
import l from '../Labels/Labels'

type HydraMapping = {
  property: string
  required: boolean
  variable: string
}

export type ApiListResponse = {
  '@context': string
  'hydra:search'?: {
    'hydra:mapping'?: HydraMapping[]
  }
}

export type Filters = {
  default: Filter[]
  advanced: Filter[]
}

export default class Filter {
  constructor(
    public label: string,
    public name: string,
    public type = 'text',
    public config: SimpleSelectConfig | DataFetchingSelectConfig | null = null,
    public value: string | string[] = '',
    public toggleExact = false,
    public exact = false,
    public description: string | null = null
  ) {}

  static async createFromApiResponse(response: ApiListResponse) {
    if (!response?.['hydra:search']?.['hydra:mapping']) return null
    const hydraMapping = response['hydra:search']['hydra:mapping']
    const filters: Filters = {
      default: [],
      advanced: [],
    }

    const ipartailVariablesToExclude: string[] = [
    ]

    const partialSearchFilters = hydraMapping
      .filter((searchObj) => searchObj.variable.includes('[ipartial]'))
      .filter(
        (searchObj) => !ipartailVariablesToExclude.includes(searchObj.variable)
      )
      .map((searchObj) => {
        const initialValue = ''

        return new Filter(
          Filter.getFilterLabel(searchObj.property),
          searchObj.variable,
          'text',
          null,
          initialValue
        )
      })

    const rangeFilters = hydraMapping
      .filter(
        (searchObj) =>
          (searchObj.variable.includes('[lt]') ||
            searchObj.variable.includes('[gte]'))
      )
      .map(
        (searchObj) =>
          new Filter(
            Filter.getFilterLabel(searchObj.variable),
            searchObj.variable
          )
      )

    const multisearchFilter = this.findByProperty(hydraMapping, 'multisearch')

    const customFilters: Filter[] = []

    const typeFilter = this.findByProperty(hydraMapping, 'type')

    const auditDateFilter = this.findByProperty(
      hydraMapping,
      'createdAt[before]'
    )
    const dateFilter = this.findByProperty(hydraMapping, 'date[after]')

    if (auditDateFilter) {
      customFilters.push(
          new Filter(
              'Izveidošanas datums',
              auditDateFilter.property,
              'date-range',
              undefined,
              []
          )
      )
    }
    if (dateFilter) {
      const initialValue: string[] = []

      customFilters.push(
        new Filter(
          'Datums',
          dateFilter.property,
          'date-range',
          undefined,
          initialValue
        )
      )
    }

    if (multisearchFilter) {
      filters.default = [new Filter('Meklēt', multisearchFilter.variable)]
      filters.advanced = [
        ...partialSearchFilters,
        ...rangeFilters,
        ...customFilters,
      ]
    } else {
      filters.default = [
        ...partialSearchFilters,
        ...rangeFilters,
        ...customFilters,
      ]
    }

    return filters
  }

  static getFilterLabel = (property: string) => {
    if (!(property in filterPropToLabel)) return property
    return filterPropToLabel[property as keyof typeof filterPropToLabel]
  }
  static findByProperty = (hydraMapping: HydraMapping[], variable: string) =>
    hydraMapping.find((searchObj) => searchObj.variable === variable)
}

const filterPropToLabel = {
  value: l('common', 'value'),
  title: l('common', 'title'),
  firstName: l('common', 'firstName'),
  lastName: l('common', 'lastName'),
  email: l('common', 'email'),
  phone: l('common', 'phone'),
  notes: l('common', 'notes'),
  userIdentifier: l('audit', 'userIdentifier'),
  ipAddress: l('audit', 'ipAddress'),
  category: l('audit', 'category'),
  message: l('audit', 'message'),
  code: l('common', 'code'),
  userEmail: l('common', 'email'),
}
