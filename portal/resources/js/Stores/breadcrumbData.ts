import { defineStore } from 'pinia'

export const useBreadcrumbData = defineStore('breadcrumbData', {
  state: (): {
    customerTitle: string | null
    contractNr: string | null
    offerTemplateTitle: string | null
    estimateNr: string | null
  } => ({
    customerTitle: null,
    contractNr: null,
    offerTemplateTitle: null,
    estimateNr: null,
  }),
  actions: {
    setCustomerTitle(value: string | null) {
      this.customerTitle = value
    },
    setContractNr(value: string | null) {
      this.contractNr = value
    },
    setOfferTemplateTitle(value: string | null | undefined) {
      this.offerTemplateTitle = value ?? null
    },
    setEstimateNr(value: string | null | undefined) {
      this.estimateNr = value ?? null
    },
  },
})
