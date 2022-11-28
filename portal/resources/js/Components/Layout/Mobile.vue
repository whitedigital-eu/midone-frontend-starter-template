<template>
  <!-- BEGIN: Mobile Menu -->
  <div class="mobile-menu md:hidden">
    <div class="mobile-menu-bar">
      <span class="logo -intro-x block mt-5 -ml-5">
        <img
          alt=""
          class="logo__image"
          src="/images/logos/logo.png"
        />
      </span>
      <div class="ml-auto mt-5 flex gap-4">
        <BarChart2Icon
          class="w-8 h-8 text-white transform -rotate-90"
          @click="toggleMobileMenu"
        />
      </div>
    </div>
    <transition @enter="enter" @leave="leave">
      <ul
        v-if="activeMobileMenu"
        class="border-t border-white/[0.08] py-2 hidden"
      >
        <li
          class="flex justify-between items-center px-4 pb-2 border-b border-white/[0.08]"
        >
          <TimezoneInfo />
          <ProfileDropdown />
        </li>
        <!-- BEGIN: First Child -->
        <template v-for="(item, i) in menu" :key="i">
          <li>
            <a
              href="#"
              class="menu"
              :class="{
                'menu--active': isActive(item),
              }"
              @click.prevent="linkTo(item, router, $event)"
            >
              <div class="menu__icon">
                <component :is="item.icon" />
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
                  <ChevronDownIcon data-role="toggle-menu" />
                </div>
              </div>
            </a>
            <!-- BEGIN: Second Child -->
            <transition @enter="enter" @leave="leave">
              <ul v-if="item.subMenu && item.title === openMenuTitle">
                <li v-for="(submenuItem, j) in item.subMenu" :key="j">
                  <a
                    href="#"
                    class="menu"
                    :class="{ 'menu--active': isActive(submenuItem) }"
                    @click="linkTo(submenuItem, router, $event)"
                  >
                    <div class="menu__icon">
                      <component :is="submenuItem.icon" />
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
                        <ChevronDownIcon />
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
//TODO: refaktorēt gan mob gan desktop navigāciju!!!!!

import { Router, RouteRecordName, useRoute, useRouter } from 'vue-router'
import { computed, onMounted, ref, watch } from 'vue'
import useNavigationShared from './shared'
import { useMenu } from '../../Stores/menu'
import TimezoneInfo from './TimezoneInfo.vue'
import ProfileDropdown from './ProfileDropdown.vue'
import MenuItem from '../../Mixins/Menu'

const { enter, leave, isActive } = useNavigationShared()
const route = useRoute()
const router = useRouter()
const menuStore = useMenu()

const activeMobileMenu = ref(false)
const toggleMobileMenu = () => {
  activeMobileMenu.value = !activeMobileMenu.value
}

const menu = computed(() => menuStore.menu)
const openMenuTitle = ref<string | null>(null)

const linkTo = (menu: MenuItem, router: Router, event: Event) => {
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
