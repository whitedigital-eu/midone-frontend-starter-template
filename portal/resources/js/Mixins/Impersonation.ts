import { useLocalStorage } from '@vueuse/core'
import { watch } from 'vue'

const impersonatedUserEmail = useLocalStorage<string | null>(
  'impersonatedUserEmail',
  null
)

const xhrOriginalOpen = XMLHttpRequest.prototype.open

watch(
  impersonatedUserEmail,
  (newVal) => {
    if (newVal) {
      //@ts-ignore
      XMLHttpRequest.prototype.open = function (
        ...args: Parameters<typeof XMLHttpRequest.prototype.open>
      ) {
        xhrOriginalOpen.apply(this, args)
        this.setRequestHeader('X-Switch-User', newVal)
      }
    } else {
      XMLHttpRequest.prototype.open = xhrOriginalOpen
    }
  },
  { immediate: true }
)

const impersonate = (email: string) => {
  impersonatedUserEmail.value = email
  location.reload()
}
const stopImpersonation = () => {
  impersonatedUserEmail.value = null
  location.reload()
}

export { impersonatedUserEmail, impersonate, stopImpersonation }
