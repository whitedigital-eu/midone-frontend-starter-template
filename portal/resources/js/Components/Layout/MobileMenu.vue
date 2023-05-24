<template>
  <!-- BEGIN: Mobile Menu -->
  <div class="md:hidden mobile-menu">
    <div class="mobile-menu-bar">
      <span class="-intro-x -ml-4 block logo mt-4">
         <!-- TODO: add logo source and alt text -->
        <img
          alt=""
          class="logo__image ml-4"
          src=""
        />
      </span>
      <div class="flex gap-4 ml-auto mt-5">
        <Icon
          class="-rotate-90 h-8 text-white transform w-8"
          name="BarChart2"
          @click="toggleMobileMenu"
        />
      </div>
    </div>
    <transition @enter="enter" @leave="leave">
      <ul
        v-if="activeMobileMenu && menuStore.menu"
        class="border-t border-white/[0.08] hidden py-2"
      >
        <li
          class="border-b border-white/[0.08] flex items-center justify-between pb-2 px-4"
        >
          <TimezoneInfo />
          <ProfileDropdown />
        </li>
        <!-- BEGIN: First Child -->
        <template v-for="(item, i) in menuStore.menu as MenuItemVM[]" :key="i">
          <li>
            <a
              class="menu"
              :class="{
                'menu--active': isActive(item),
              }"
              href="#"
              @click.prevent="linkTo(item, router, $event)"
            >
              <div class="menu__icon">
                <component :is="item.icon as any" />
              </div>
              <div class="menu__title">
                {{ item.title }}
                <div
                  v-if="item.subMenu"
                  class="menu__sub-icon"
                  :class="{
                    'transform rotate-180': item.title === openMenuTitle,
                  }"
                >
                  <Icon data-role="toggle-menu" name="ChevronDown" />
                </div>
              </div>
            </a>
            <!-- BEGIN: Second Child -->
            <transition @enter="enter" @leave="leave">
              <ul v-if="item.subMenu && item.title === openMenuTitle">
                <li
                  v-for="(submenuItem, j) in item.subMenu as MenuItemVM[]"
                  :key="j"
                >
                  <a
                    class="menu"
                    :class="{ 'menu--active': isActive(submenuItem) }"
                    href="#"
                    @click="linkTo(submenuItem, router, $event)"
                  >
                    <div class="menu__icon">
                      <component :is="submenuItem.icon as any" />
                    </div>
                    <div class="menu__title">
                      {{ submenuItem.title }}
                      <div
                        v-if="submenuItem.subMenu"
                        class="menu__sub-icon"
                        :class="{
                          'transform rotate-180':
                            submenuItem.title === openMenuTitle,
                        }"
                      >
                        <Icon name="ChevronDown" />
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </transition>
            <!-- END: Second Child -->
          </li>
        </template>
        <!-- END: First Child -->
      </ul>
    </transition>
  </div>
  <!-- END: Mobile Menu -->
</template>

<script setup lang="ts">
import { Router, RouteRecordName, useRoute, useRouter } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import useNavigationShared from './shared'
import { useMenu } from '../../Stores/menu'
import TimezoneInfo from './TimezoneInfo.vue'
import ProfileDropdown from './ProfileDropdown.vue'
import MenuItemVM from '../../Mixins/Menu'
import Icon from '../Common/Icons/Icon.vue'

const { enter, leave, isActive } = useNavigationShared()
const route = useRoute()
const router = useRouter()
const menuStore = useMenu()

const activeMobileMenu = ref(false)
const toggleMobileMenu = () => {
  activeMobileMenu.value = !activeMobileMenu.value
}

const openMenuTitle = ref<string | null>(null)

const linkTo = (menu: MenuItemVM, router: Router, event: Event) => {
  if (
    (event.target as HTMLElement | undefined)?.dataset?.role === 'toggle-menu'
  ) {
    openMenuTitle.value = openMenuTitle.value === menu.title ? null : menu.title
    return
  } else if (!menu.subMenu || !menu.subMenu.length) {
    activeMobileMenu.value = false
  }
  if (menu.subMenu && menu.subMenu.length) {
    openMenuTitle.value = openMenuTitle.value === menu.title ? null : menu.title
  } else {
    event.preventDefault()
    router.push({
      name: menu.name as RouteRecordName,
    })
  }
}

onMounted(() => {
  openMenuTitle.value = route.name as string
})

watch(route, () => {
  activeMobileMenu.value = false
})
</script>

<style lang="scss" scoped>
.menu--active {
  font-weight: bold;
}
</style>
