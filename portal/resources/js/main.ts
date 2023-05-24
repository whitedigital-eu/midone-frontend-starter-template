import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import dayjs from 'dayjs'
import 'dayjs/locale/lv'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isToday from 'dayjs/plugin/isToday'
import isYesterday from 'dayjs/plugin/isYesterday'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
//@ts-ignore
import globalComponents from '../global-components/'
import * as Sentry from '@sentry/vue'
import { BrowserTracing } from '@sentry/tracing'

dayjs.locale('lv')
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
dayjs.extend(isToday)
dayjs.extend(isYesterday)
dayjs.extend(utc)
dayjs.extend(timezone)

import '../css/app.css'

const pinia = createPinia()
//@ts-ignore
pinia.use(({ store }) => (store.router = markRaw(router)))
// @ts-ignore
const app = createApp(App).use(router).use(pinia)

globalComponents(app)

if (import.meta.env.PROD) {
  Sentry.init({
    app,
    dsn: 'https://fdae25cd3c48490382b5f247550f13f1@o1251752.ingest.sentry.io/6752923',
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      }),
    ],
    tracesSampleRate: 0,
  })
}

app.mount('#app')
