// import { MenuStructure } from '../Types/Authorization'
import { ROUTE_NAME } from '../routes'

class MenuItem {
  constructor(
    public name: ROUTE_NAME | null,
    public title: string,
    public icon: string,
    public meta?: {
      unvalidated?: number
    },
    public subMenu: MenuItem[] | null = null
  ) {}

  public static createStaticMenu() {
    return [
      new MenuItem('SAMPLE', 'Sample page', 'SettingsIcon'),
    ]
  }

  // public static createFromMenuStructure(
  //   apiStructure: MenuStructure[]
  // ): MenuItem[] {
  //   // return apiStructure
  //   //   .map(MenuItem.structureItemToMenuItem)
  //   //   .filter((x) => !!x) as MenuItem[]
  //   return []
  // }
}

export default MenuItem
