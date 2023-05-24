import { ROUTE_NAME } from '../routes'
import * as usedIcons from '../Components/Common/Icons/usedIcons'

class MenuItemVM {
  constructor(
    public name: ROUTE_NAME | null,
    public title: string,
    public icon: keyof typeof usedIcons,
    public meta?: {
      unvalidated?: number
    },
    public subMenu: MenuItemVM[] | null = null
  ) {}

  private static routeNameToIcon: Record<string, keyof typeof usedIcons> = {
    CLASSIFIERS: 'Settings',
    USERS: 'Users',
    AUDITS: 'FileWarning',
    ADMINISTRATION: 'ShieldAlert',
  } as const

  //TODO: menuItem should have a type that is returned from the API
  private static structureItemToMenuItem(menuItem: any): MenuItemVM {
    const icon = MenuItemVM.routeNameToIcon[menuItem.id]
    if (!icon) {
      console.error(
        'Could not generate icon for MenuItem with ID ',
        menuItem.id
      )
    }

    return menuItem.children.length
      ? new MenuItemVM(
          null,
          menuItem.name,
          icon,
          {},
          menuItem.children.map(MenuItemVM.structureItemToMenuItem)
        )
      : new MenuItemVM(menuItem.id, menuItem.name, icon)
  }

  public static createFromMenuStructure(menuItems: any[]): MenuItemVM[] {
    return menuItems.map(MenuItemVM.structureItemToMenuItem)
  }

  public static createStaticMenu() {
    return [
      new MenuItemVM('CLASSIFIERS', 'Klasifikatori', 'Settings'),
      new MenuItemVM('USERS', 'Lietotāji', 'Users'),
      new MenuItemVM('AUDITS', 'Auditi', 'FileWarning'),
    ]
  }
}

export default MenuItemVM
