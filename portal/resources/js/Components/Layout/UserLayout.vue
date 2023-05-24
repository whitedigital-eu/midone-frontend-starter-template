<template>
  <div>
    <MobileMenu />
    <TopBar />
    <div class="flex overflow-hidden">
      <!-- BEGIN: Side Menu -->
      <nav class="side-nav">
        <ul>
          <!-- BEGIN: First Child -->
          <li
            v-for="(menu, menuKey) in formattedMenu"
            :key="JSON.stringify(menu) + menuKey"
          >
            <SideMenuTooltip
              class="side-menu"
              :class="{
                'side-menu--active': isActive(menu),
                'side-menu--open': menu.title === openMenuTitle,
              }"
              :content="menu.title"
              :href="getSideMenuItemHref(menu)"
              tag="a"
              @click="linkTo(menu, router, $event)"
            >
              <div class="side-menu__icon text-white">
                <Icon :name="menu.icon" />
              </div>
              <div class="side-menu__title text-white">
                {{ menu.title }}
                <div v-if="menu.subMenu" class="side-menu__sub-icon">
                  <span class="flex gap-2 items-center">
                    <Icon
                      :class="{
                        'transform rotate-180': menu.title === openMenuTitle,
                      }"
                      data-role="toggle-menu"
                      name="ChevronDown"
                    />
                  </span>
                </div>
              </div>
            </SideMenuTooltip>
            <!-- BEGIN: Second Child -->
            <transition @enter="enter" @leave="leave">
              <ul
                v-if="menu.subMenu && menu.title === openMenuTitle"
                class="ml-2 xl:ml-8"
              >
                <li
                  v-for="(subMenu, subMenuKey) in menu.subMenu"
                  :key="subMenuKey"
                >
                  <SideMenuTooltip
                    class="!pl-4 !xl:pl-8 side-menu"
                    :class="{
                      'side-menu--active': subMenu.name === route.name,
                    }"
                    :content="subMenu.title"
                    :href="
                      subMenu.subMenu
                        ? 'javascript:;'
                        : router.resolve({ name: subMenu.name ?? undefined })
                            .path
                    "
                    tag="a"
                    @click="linkTo(subMenu, router, $event)"
                  >
                    <div class="side-menu__icon text-white">
                      <Icon :name="subMenu.icon" />
                    </div>
                    <div class="side-menu__title text-white">
                      {{ subMenu.title }}
                    </div>
                  </SideMenuTooltip>
                </li>
              </ul>
            </transition>
            <!-- END: Second Child -->
          </li>
          <!-- END: First Child -->
        </ul>
      </nav>
      <!-- END: Side Menu -->
      <!-- BEGIN: Content -->
      <div class="content">
        <router-view />
      </div>
      <!-- END: Content -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, provide, ref, watch } from 'vue'
import { Router, RouteRecordName, useRoute, useRouter } from 'vue-router'
// @ts-ignore
import { helper as $h } from '@/utils/helper'
import TopBar from './TopBar.vue'
import MobileMenu from './MobileMenu.vue'
import SideMenuTooltip from './SideMenuTooltip.vue'
//@ts-ignore
import dom from '@left4code/tw-starter/dist/js/dom'
import useNavigationShared from './shared'
import { useMenu } from '../../Stores/menu'
import MenuItemVM from '../../Mixins/Menu'
import Icon from '../Common/Icons/Icon.vue'

const { enter, leave, isActive } = useNavigationShared()

const route = useRoute()
const router = useRouter()
const menuStore = useMenu()
const formattedMenu = ref<MenuItemVM[]>([])

const sideMenu = computed(() => menuStore.menu)

provide('forceActiveMenu', () => {
  formattedMenu.value = $h.toRaw(sideMenu.value)
})

watch(
  computed(() => route.path),
  () => {
    formattedMenu.value = $h.toRaw(sideMenu.value)
  }
)
watch(sideMenu, () => {
  formattedMenu.value = $h.toRaw(sideMenu.value)
})

const openMenuTitle = ref<string | null>(null)

onMounted(() => {
  dom('body').removeClass('error-page').removeClass('login').addClass('main')
  formattedMenu.value = $h.toRaw(sideMenu.value)

  if (menuStore.menu) {
    const menuItemToExpand = menuStore.menu.find((x) =>
      x.subMenu?.some((y) => y.name === route.name)
    )

    if (menuItemToExpand) openMenuTitle.value = menuItemToExpand.title
  }
})

const getSideMenuItemHref = (menu: MenuItemVM) => {
  if (!menu.subMenu) {
    try {
      return router.resolve({ name: menu.name as RouteRecordName }).path
    } catch (e) {
      console.error(e)
    }
  }
  return 'javascript:;'
}

const linkTo = (menu: MenuItemVM, router: Router, event: Event) => {
  if (
    (event?.target as HTMLElement | undefined)?.dataset?.role === 'toggle-menu'
  ) {
    openMenuTitle.value = openMenuTitle.value === menu.title ? null : menu.title
    return
  }
  if (menu.subMenu && menu.subMenu.length) {
    openMenuTitle.value = menu.title
    router.push({
      name: menu.subMenu[0].name as RouteRecordName,
    })
  } else {
    event.preventDefault()
    router.push({
      name: menu.name as RouteRecordName,
    })
  }
}
</script>
