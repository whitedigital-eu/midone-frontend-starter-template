import { createRouter, createWebHistory } from 'vue-router'
import { routes, DEFAULT_ROUTES } from './routes'

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

// router.beforeEach(async (to) => {
//   await loadCurrentIdentity()
//
//   if (to.meta.requiresAuth) {
//     if (!currentIdentity.value) return { name: DEFAULT_ROUTES.guest }
//   } else if (currentIdentity.value && currentIdentityDefaultRoute.value) {
//     return { name: currentIdentityDefaultRoute.value }
//   }
//
//   if (typeof to.params.id === 'string' && !isPositiveInteger(to.params.id)) {
//     return { name: DEFAULT_ROUTES.authenticated }
//   }
// })

export default router
