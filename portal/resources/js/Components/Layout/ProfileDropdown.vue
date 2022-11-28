<template>
  <Dropdown class="intro-x w-8 h-8">
    <DropdownToggle
      tag="div"
      role="button"
      class="w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in scale-110 bg-white"
      ref="dropdownToggle"
    >
      <UserIcon class="m-1" />
    </DropdownToggle>
    <DropdownMenu class="w-56">
      <DropdownContent
        class="bg-primary/80 before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white"
      >
        <DropdownHeader tag="div" class="!font-normal" v-if="currentUserData">
          <div>
            <div class="font-medium">
              {{ currentUserData.firstName }}
              {{ currentUserData.lastName }}
            </div>
          </div>
        </DropdownHeader>
        <DropdownDivider class="border-white/[0.08]" v-if="currentUserData" />
        <DropdownItem
          class="dropdown-item hover:bg-white/5"
          @click="dropdownToggle.$el.click()"
        >
          <router-link :to="{ name: 'PROFILE' }" class="flex">
            <UserCogIcon class="w-4 h-4 mr-2" />
            <span>Mans profils</span>
          </router-link>
        </DropdownItem>
        <DropdownItem
          class="dropdown-item hover:bg-white/5"
          @click="
            () => {
              dropdownToggle.$el.click()
              showChangePasswordModal = true
            }
          "
        >
          <span class="flex gap-2">
            <KeyIcon class="w-4 h-4" />
            <span>Mainīt paroli</span>
          </span>
        </DropdownItem>
        <DropdownItem
          class="dropdown-item hover:bg-white/5"
          @click="handleLogOff"
        >
          <ToggleRightIcon class="w-4 h-4 mr-2" />
          Atteikties
        </DropdownItem>
      </DropdownContent>
    </DropdownMenu>
  </Dropdown>

  <ChangePasswordFormModal
    v-if="showChangePasswordModal"
    @close="showChangePasswordModal = false"
  />
</template>

<script setup lang="ts">
// import { currentIdentity, logOff } from '../../Mixins/Auth'
import { ref, watch } from 'vue'
// import { User } from '../../Types/User'
// import UserRepository from '../../Repositories/UserRepository'
// import ChangePasswordFormModal from '../Forms/ChangePasswordFormModal.vue'

const dropdownToggle = ref()

const handleLogOff = () => {
  dropdownToggle.value.$el.click()
  // logOff()
}

// const currentUserData = ref<User | null>(null)

// watch(
//   currentIdentity,
//   async (newVal, oldVal) => {
//     if (newVal && newVal?.user !== oldVal?.user) {
//       currentUserData.value = await UserRepository.get(newVal.user)
//       // menuStore.loadMenu()
//       // authorizationStore.loadResourcePermissions()
//     }
//   },
//   { immediate: true }
// )
//
// const showChangePasswordModal = ref(false)
</script>
