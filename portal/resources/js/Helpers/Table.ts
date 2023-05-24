import { createColumn } from 'wd-frontend-shared/components/Table/Column'
import { ColumnDefinition } from 'tabulator-tables'

export const createIconTitle = (
  label: string,
  iconNames: string[]
): { label: string; tableTitle: string } => {
  const icons = iconNames
    .map((x) => `<i data-lucide="${x}" class="h-5"></i>`)
    .join('')
  const tableTitle = `<div class="flex" title="${label}">${icons}</div>`
  return { label, tableTitle }
}

export const createMoneyColumn = (colData: ColumnDefinition) => {
  return createColumn({
    formatter: 'money',
    formatterParams: {
      decimal: ',',
      thousand: '​',
    },
    ...colData,
  })
}

export const enum COL_WIDTHS {
  firstName = 90,
  lastName = 110,
}
