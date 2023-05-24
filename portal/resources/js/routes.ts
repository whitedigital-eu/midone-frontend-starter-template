import { RouteRecordRaw } from 'vue-router'

export type ROUTE_NAME =
  | 'LOGIN'
  | 'USERS'
  | 'AUDITS'
  | 'RESET_PASSWORD'
  | 'PASSWORD_RESET_REQUEST'
  | 'CLASSIFIERS'
  | 'PROFILE'
  | 'NOT_FOUND'

export const GUEST_DEFAULT_ROUTE = 'LOGIN' as const

const idPropFunc: RouteRecordRaw['props'] = (route) => ({
  id: Number(route.params.id),
})

const addOnlyActiveEntriesFilter = (to) => {
  if (!('exists[horizonHref]' in to.query)) {
    return {
      ...to,
      query: {
        ...to.query,
        'exists[horizonHref]': Boolean(true).toString(),
      },
    }
  } else return
}

export const routes: (RouteRecordRaw & { name: ROUTE_NAME })[] = [
  {
    path: '/login',
    component: () => import('./Pages/LoginPage.vue'),
    name: 'LOGIN',
  },
  {
    path: '/reset-password-requests/:token',
    component: () => import('./Pages/ResetPasswordForm.vue'),
    name: 'RESET_PASSWORD',
    props: true,
  },
  {
    path: '/password-reset-request',
    component: () => import('./Pages/ResetPasswordRequestPage.vue'),
    name: 'PASSWORD_RESET_REQUEST',
  },
  {
    path: '/classifiers',
    component: () => import('./Pages/ClassifiersPage.vue'),
    name: 'CLASSIFIERS',
    meta: { requiresAuth: true },
  },
  {
    path: '/users',
    component: () => import('./Pages/UsersPage.vue'),
    name: 'USERS',
    meta: { requiresAuth: true },
  },
  {
    path: '/audits',
    component: () => import('./Pages/AuditsPage.vue'),
    name: 'AUDITS',
    meta: { requiresAuth: true },
  },
  {
    path: '/profile',
    component: () => import('./Pages/ProfilePage.vue'),
    name: 'PROFILE',
    meta: { requiresAuth: true },
  },
  {
    path: '/:catchAll(.*)',
    name: 'NOT_FOUND',
    redirect: { name: GUEST_DEFAULT_ROUTE },
  },
]

export const userRouteNames = routes
  .filter((r) => r.meta?.requiresAuth)
  .map((r) => r.name)

export const guestRouteNames = routes
  .filter((r) => !r.meta?.requiresAuth)
  .map((r) => r.name)
