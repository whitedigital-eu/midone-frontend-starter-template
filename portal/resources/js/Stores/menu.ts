import { defineStore } from 'pinia'
import MenuItem from '../Mixins/Menu'

export const useMenu = defineStore('menu', {
  state: (): { menu: MenuItem[] | null } => ({
    menu: null,
  }),
  actions: {
    async loadMenu() {
      // try {
      //   this.menu = MenuItem.createFromMenuStructure(
      //     await loadResourceList<MenuStructure>(
      //       createIriString('authorization/menu_structure')
      //     )
      //   )
      // } catch (e) {
      //   console.log(e)
      // }

      this.menu = MenuItem.createStaticMenu()
    },
  },
})
