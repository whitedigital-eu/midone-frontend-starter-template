import { createRouter, createWebHistory } from 'vue-router'
import {
  GUEST_DEFAULT_ROUTE,
  ROUTE_NAME,
  routes,
} from './routes'

import { currentIdentity, loadCurrentIdentity } from './Mixins/Auth'
import { useMenu } from './Stores/menu'

const isPositiveInteger = (s: string) => {
  const num = Number(s)
  return Number.isInteger(num) && num > 0
}

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  },
})

router.beforeEach(async (to) => {
  const menuStore = useMenu()
  if (!currentIdentity.value) await loadCurrentIdentity()

  if (to.meta.requiresAuth) {
    if (!currentIdentity.value) return { name: GUEST_DEFAULT_ROUTE }
    if (!menuStore.menu) await menuStore.loadMenu()
  } else if (currentIdentity.value) {
    if (!menuStore.menu) await menuStore.loadMenu()
    if (menuStore.firstMenuItemRouteName) {
      return { name: menuStore.firstMenuItemRouteName }
    }
  }

  if (
    typeof to.params.id === 'string' &&
    !isPositiveInteger(to.params.id) &&
    menuStore.firstMenuItemRouteName
  ) {
    return { name: menuStore.firstMenuItemRouteName }
  }
})

export default router
