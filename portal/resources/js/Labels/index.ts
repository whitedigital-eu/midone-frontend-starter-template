import common from './Common'
import classifier from './Classifier'
import customer from './Customer'
import contactPerson from './ContactPerson'
import property from './Property'
import user from './User'
import serviceRequest from './ServiceRequest'
import workItem from './WorkItem'
import audit from './Audit'
import offerTemplate from './OfferTemplate'
import offerTemplateItem from './OfferTemplateItem'
import measurementUnit from './MeasurementUnit'
import contract from './Contract'
import contractEntry from './ContractEntry'
import acceptanceCertificate from './AcceptanceCertificate'
import estimate from './Estimate'
import estimateEntry from './EstimateEntry'
import contractEntrySubEntry from './ContractEntrySubEntry'

const modules = {
  common,
  classifier,
  customer,
  contactPerson,
  property,
  user,
  serviceRequest,
  workItem,
  audit,
  offerTemplate,
  offerTemplateItem,
  measurementUnit,
  contract,
  contractEntry,
  acceptanceCertificate,
  estimate,
  estimateEntry,
  contractEntrySubEntry,
}

function getLabel<
  ModName extends keyof typeof modules,
  PropName extends keyof typeof modules[ModName]
>(modName: ModName, property: PropName, transform?: 'upper'): string {
  const label = modules[modName][property] as unknown as string
  if (transform === 'upper') return label.toUpperCase()
  return label
}

const l = getLabel
export default l
