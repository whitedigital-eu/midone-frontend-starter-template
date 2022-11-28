import { RouteMeta, RouteRecord, RouteRecordRaw } from 'vue-router'

const SamplePage = () => import('./Pages/SamplePage.vue')

export type ROUTE_NAME =
  | 'SAMPLE'

export enum DEFAULT_ROUTES {
  guest = 'SAMPLE',
  authenticated = 'SAMPLE',
}

const idPropFunc: RouteRecordRaw['props'] = (route) => ({
  id: Number(route.params.id),
})

export const routes: (RouteRecordRaw & { name: ROUTE_NAME })[] = [
  {
    path: '/',
    component: SamplePage,
    name: 'SAMPLE',
  },
]

export const userRouteNames = routes
  .filter((r) => r.meta?.requiresAuth)
  .map((r) => r.name)

export const guestRouteNames = routes
  .filter((r) => !r.meta?.requiresAuth)
  .map((r) => r.name)
