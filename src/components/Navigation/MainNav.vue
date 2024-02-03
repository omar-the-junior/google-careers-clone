<template>
  <header
    :class="[
      'w-full',
      'text-sm',
      headerHighetClass,
    ]"
  >
    <div
      class="fixed left-0 top-0 h-16 w-full bg-white"
    >
      <div
        class="mx-auto flex h-full flex-nowrap border-b border-solid border-brand-gray-1 px-8"
      >
        <a
          :href="url"
          class="flex h-full items-center text-xl"
          >{{ company }}</a
        >

        <nav class="ml-12 h-full">
          <ul class="flex h-full list-none">
            <li
              v-for="menuItem in menuItems"
              :key="menuItem"
              class="ml-9 h-full first:ml-0"
            >
              <a
                href=""
                class="flex h-full items-center py-2.5"
                >{{ menuItem }}</a
              >
            </li>
          </ul>
        </nav>

        <div
          class="ml-auto flex h-full items-center"
        >
          <profile-image v-if="isLoggedIn" />
          <action-button
            v-else
            text="Sign in"
            @click="loginUser"
          />
        </div>
      </div>

      <the-subnav v-if="isLoggedIn" />
    </div>
  </header>
</template>

<script>
import ActionButton from '../Shared/ActionButton.vue'
import ProfileImage from './ProfileImage.vue'
import TheSubnav from './TheSubnav.vue'

export default {
  name: 'MainNav',
  components: {
    ActionButton,
    ProfileImage,
    TheSubnav,
  },
  data() {
    return {
      company: 'Google Careers',
      url: 'https://careers.google.com',
      menuItems: [
        'Teams',
        'Locations',
        'Life at Google Corp',
        'How we hire',
        'Students',
        'Jobs',
      ],
      isLoggedIn: false,
    }
  },
  computed: {
    // TODO: Find a better fix for this using only tailwind classes
    headerHighetClass() {
      return {
        'h-16': !this.isLoggedIn,
        'h-32': this.isLoggedIn,
      }
    },
  },
  methods: {
    loginUser() {
      this.isLoggedIn = true
    },
  },
}
</script>
