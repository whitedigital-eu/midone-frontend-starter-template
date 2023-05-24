<template>
  <main>
    <div class="gap-6 grid grid-cols-12">
      <div class="col-span-12 mt-8">
        <div class="flex h-10 intro-y items-center">
          <h2 class="font-medium text-2xl truncate">Mans profils</h2>
          <button
            class="bg-white btn ml-4 px-4 py-2 rounded-lg"
            :disabled="!user"
            @click="showEditUserModal = true"
          >
            <Icon name="Edit2" />
          </button>
        </div>

        <div v-if="user" class="box intro-y mt-5 pt-5 px-5">
          <div
            class="-mx-5 border-b border-slate-200/60 dark:border-darkmode-400 flex flex-col md:flex-row pb-5"
          >
            <div
              class="border-l border-r border-slate-200/60 dark:border-darkmode-400 flex-1 px-5"
            >
              <div class="flex flex-col gap-4 items-start justify-center">
                <div
                  class="flex items-center sm:whitespace-normal truncate"
                  title="E-pasts"
                >
                  <Icon class="mr-2" name="Mail" size="20" />
                  {{ user.email }}
                </div>
                <div
                  class="flex items-center sm:whitespace-normal truncate"
                  title="Telefona numurs"
                >
                  <Icon class="mr-2" name="Phone" size="20" />
                  {{ user.phone }}
                </div>
                <div
                  class="flex items-center sm:whitespace-normal truncate"
                  title="Izveidošanas datums"
                >
                  <Icon class="mr-2" name="Calendar" size="20" />
                  {{ dateTimeFormatter(user.createdAt) }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Loader v-else />
      </div>
    </div>
  </main>

  <ProfileFormModal
    v-if="currentIdentity && showEditUserModal"
    :iri="currentIdentity.user"
    @close="showEditUserModal = false"
    @success="loadUserData"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Loader from '../Partials/Loader.vue'
import { dateTimeFormatter } from '../Helpers/DateTime'
import ProfileFormModal from '../Components/Forms/ProfileFormModal.vue'
import { currentIdentity, loadCurrentIdentity } from '../Mixins/Auth'
import UserRepository from '../Repositories/UserRepository'
import Icon from '../Components/Common/Icons/Icon.vue'
import {User} from "../Types/User";

const user = ref<User | null>(null)
const showEditUserModal = ref(false)

const loadUserData = async () => {
  if (!currentIdentity.value) await loadCurrentIdentity()
  if (!currentIdentity.value) return
  user.value = await UserRepository.get(currentIdentity.value.user)
}

onMounted(() => {
  loadUserData()
})
</script>
