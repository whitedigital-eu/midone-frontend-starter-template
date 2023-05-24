import common from './Common'
import user from './User'
import audit from './Audit'

const modules = {
  common,
  user,
  audit,
}

function getLabel<
  ModName extends keyof typeof modules,
  PropName extends keyof (typeof modules)[ModName]
>(modName: ModName, property: PropName, transform?: 'upper'): string {
  const label = modules[modName][property] as unknown as string
  if (transform === 'upper') return label.toUpperCase()
  return label
}

const l = getLabel
export default l
