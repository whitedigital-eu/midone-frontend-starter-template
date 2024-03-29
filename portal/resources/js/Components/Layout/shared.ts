//@ts-ignore
import dom from '@left4code/tw-starter/dist/js/dom'
import { useRoute } from 'vue-router'
import MenuItemVM from '../../Mixins/Menu'

export default function useNavigationShared() {
  const route = useRoute()

  const enter = (el: Element) => dom(el).slideDown(300)
  const leave = (el: Element) => dom(el).slideUp(300)

  const isActive = (menuItem: MenuItemVM) => {
    if (menuItem.subMenu) {
      for (let i = 0; i < menuItem.subMenu.length; i++) {
        if (menuItem.subMenu[i].name === route.name) {
          return true
        }
      }
    }

    return menuItem.name === route.name
  }

  return {
    enter,
    leave,
    isActive,
  }
}
