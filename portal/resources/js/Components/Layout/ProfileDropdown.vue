<template>
  <Dropdown class="h-8 intro-x w-8">
    <DropdownToggle
      ref="dropdownToggle"
      class="bg-white h-8 image-fit overflow-hidden rounded-full scale-110 shadow-lg w-8 zoom-in"
      role="button"
      tag="div"
    >
      <Icon class="m-1" name="User" />
    </DropdownToggle>
    <DropdownMenu class="w-56">
      <DropdownContent
        class="before:absolute before:bg-black before:block before:inset-0 before:rounded-md before:z-[-1] bg-primary/80 text-white"
      >
        <DropdownHeader v-if="currentUserData" class="!font-normal" tag="div">
          <div>
            <div class="font-medium">
              {{ currentUserData.firstName }}
              {{ currentUserData.lastName }}
            </div>
          </div>
        </DropdownHeader>
        <DropdownDivider v-if="currentUserData" class="border-white/[0.08]" />
        <DropdownItem
          class="dropdown-item hover:bg-white/5"
          @click="dropdownToggle.$el.click()"
        >
          <router-link class="flex" :to="{ name: 'PROFILE' }">
            <Icon class="h-4 mr-2 w-4" name="UserCog" />
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
            <Icon class="h-4 w-4" name="Key" />
            <span>Mainīt paroli</span>
          </span>
        </DropdownItem>
        <DropdownItem
          class="dropdown-item hover:bg-white/5"
          @click="handleLogOff"
        >
          <Icon class="h-4 mr-2 w-4" name="ToggleRight" />
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
import { currentIdentity, logOff } from '../../Mixins/Auth'
import { ref, watch } from 'vue'
import { User } from '../../Types/User'
import UserRepository from '../../Repositories/UserRepository'
import ChangePasswordFormModal from '../Forms/ChangePasswordFormModal.vue'
import Icon from '../Common/Icons/Icon.vue'

const dropdownToggle = ref()

const handleLogOff = () => {
  dropdownToggle.value.$el.click()
  logOff()
}

const currentUserData = ref<User | null>(null)

watch(
  currentIdentity,
  async (newVal, oldVal) => {
    if (newVal && newVal?.user !== oldVal?.user) {
      currentUserData.value = await UserRepository.get(newVal.user)
    }
  },
  { immediate: true }
)

const showChangePasswordModal = ref(false)
</script>
