import { defineStore } from 'pinia'
import MenuItemVM from '../Mixins/Menu'

export const useMenu = defineStore('menu', {
  state: (): {
    menu: MenuItemVM[] | null
  } => ({
    menu: null,
  }),
  getters: {
    firstMenuItemRouteName(state) {
      if (!state.menu) {
        console.error(
          'Menu must be defined when redirecting to first menu item route!'
        )
        return
      }
      const routeToPush = state.menu.find((x) => x.name)
      return routeToPush ? routeToPush.name! : null
    },
  },
  actions: {
    async loadMenu() {
      try {
        this.menu = MenuItemVM.createStaticMenu();
      } catch (e) {
        console.error(e)
      }
    },
  },
})
