<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import ActionButton from '../Shared/ActionButton.vue'
import ProfileImage from './ProfileImage.vue'
import TheSubnav from './TheSubnav.vue'
import { computed, ref } from 'vue'

const userStore = useUserStore()

const menuItems = ref([
  { text: 'Teams', url: '/teams' },
  { text: 'Locations', url: '/' },
  { text: 'Life at Google Corp', url: '/' },
  { text: 'How we hire', url: '/' },
  { text: 'Students', url: '/' },
  { text: 'Jobs', url: '/jobs/results' },
])

const isLoggedIn = computed(() => userStore.isLoggedIn)
const headerHightClass = computed(() => ({
  'h-16': !isLoggedIn.value,
  'h-32': isLoggedIn.value,
}))
</script>

<template>
  <header :class="['w-full', 'text-sm', headerHightClass]">
    <div class="fixed left-0 top-0 z-50 h-16 w-full bg-white">
      <div
        class="rel z-50 mx-auto flex h-full flex-nowrap border-b border-solid border-brand-gray-1 px-8"
      >
        <router-link
          :to="{ name: 'Home' }"
          class="flex h-full items-center text-xl"
        >
          Google Careers
        </router-link>

        <nav class="ml-12 h-full">
          <ul class="flex h-full list-none">
            <li
              v-for="menuItem in menuItems"
              :key="menuItem.text"
              class="ml-9 h-full first:ml-0"
            >
              <router-link
                :to="menuItem.url"
                class="flex h-full items-center py-2.5"
                >{{ menuItem.text }}</router-link
              >
            </li>
          </ul>
        </nav>

        <div class="ml-auto flex h-full items-center">
          <profile-image v-if="isLoggedIn" />
          <action-button
            v-else
            text="Sign in"
            @click="userStore.login"
          />
        </div>
      </div>

      <the-subnav v-if="isLoggedIn" />
    </div>
  </header>
</template>
