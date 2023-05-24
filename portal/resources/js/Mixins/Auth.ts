import { ref } from 'vue'
import router from '../router'
import { Identity } from '../Types/Identity'
import axios from 'axios'
import AuthRepository from '../Repositories/AuthRepository'
import IdentityRepository from '../Repositories/IdentityRepository'
import { useMenu } from '../Stores/menu'
import { GUEST_DEFAULT_ROUTE } from '../routes'

const currentIdentity = ref<Identity | null>(null)

export const loadCurrentIdentity = async () => {
  try {
    currentIdentity.value = await IdentityRepository.getCurrentIdentity()
  } catch (e) {
    if (axios.isAxiosError(e) && e.response?.status === 401) {
      currentIdentity.value = null
    }
  }
}

const authenticate = async (email: string, password: string) => {
  const menuStore = useMenu()

  try {
    await AuthRepository.login(email, password)
    await loadCurrentIdentity()
    await menuStore.loadMenu()
    if (menuStore.firstMenuItemRouteName) {
      router.push({ name: menuStore.firstMenuItemRouteName })
    }
  } catch (e) {
    if (axios.isAxiosError(e) && e.response?.status === 403) {
      if (menuStore.firstMenuItemRouteName) {
        router.push({ name: menuStore.firstMenuItemRouteName })
      }
    }
  }
}

const logOff = async () => {
  if (!currentIdentity.value) {
    console.error(
      `current user should not be falsy when trying to logout! current user: ${currentIdentity.value}`
    )
    return
  }
  try {
    await AuthRepository.logout(currentIdentity.value.userId)
    currentIdentity.value = null
    router.push({ name: GUEST_DEFAULT_ROUTE })
  } catch (e) {
    if (axios.isAxiosError(e) && e.response?.status === 401) {
      currentIdentity.value = null
      router.push({ name: GUEST_DEFAULT_ROUTE })
    }
  }
}

export { currentIdentity, authenticate, logOff }
