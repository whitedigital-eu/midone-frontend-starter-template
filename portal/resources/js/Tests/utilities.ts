import { flushPromises, VueWrapper } from '@vue/test-utils'

// page content (Table and Filters) is only visible after filters have been set via emitted event from table
export const setFiltersFromTable = async (wrapper: VueWrapper<any>) => {
  wrapper
    .findComponent({ name: 'Table' })
    .getCurrentComponent()
    .emit('set:filters', { default: [], advanced: [] })
  await flushPromises()
}
