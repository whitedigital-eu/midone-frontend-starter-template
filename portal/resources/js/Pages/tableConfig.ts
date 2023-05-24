import createTableConfig from 'wd-frontend-shared/components/Table/createTableConfig'
import { dateTimeFormatter } from '../Helpers/DateTime'
import { impersonatedUserEmail } from '../Mixins/Impersonation'
import { watchEffect } from 'vue'
import { createToggleCollapseColumn } from 'wd-frontend-shared/components/Table/Column'
import Tabulator from 'tabulator-tables'

const tableConfig = createTableConfig({
  sharedColumnNames: {
    created: 'createdAt',
    updated: 'updatedAt',
  },
  dateTimeFormatter,
})

export const toggleCollapseColumn = createToggleCollapseColumn({
  width: 32,
  maxWidth: 32,
  minWidth: 32,
  responsive: 0,
})

watchEffect(() => {
  const headers = (tableConfig.ajaxConfig as Tabulator.AjaxConfig).headers
  if (headers) {
    impersonatedUserEmail.value
      ? (headers['X-Switch-User'] = impersonatedUserEmail.value)
      : delete headers['X-Switch-User']
  }
})

export default tableConfig
