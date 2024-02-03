<template>
  <form
    class="border-brand-gray-3 flex h-12 w-full items-center rounded-3xl border border-solid"
  >
    <font-awesome-icon
      :icon="['fas', 'search']"
      class="ml-4 mr-3"
    />
    <div
      class="flex h-full flex-1 flex-nowrap text-base font-light"
    >
      <div
        class="relative flex h-full flex-1 items-center pr-3"
      >
        <label
          for="role"
          class="absolute -top-10 left-0"
          >Role</label
        >
        <input
          id="role"
          v-model="role"
          type="text"
          placeholder="Software engineer"
          class="w-full text-lg font-normal focus:outline-none"
        />
      </div>

      <span
        class="border-brand-gray-3 bg-brand-gray-2 flex h-full items-center border-l border-r px-3"
        >in</span
      >
      <div
        class="relative flex h-full flex-1 items-center pl-3"
      >
        <label
          for="location"
          class="absolute -top-10 left-0"
          >Where?</label
        >
        <input
          id="location"
          v-model="location"
          type="text"
          placeholder="Los Angeles"
          class="w-full text-lg font-normal focus:outline-none"
          @input="location = $event.target.value"
        />
      </div>
    </div>
    <action-button
      text="Search"
      type="secondary"
      class="rounded-r-3xl"
    />
  </form>
</template>

<script>
import ActionButton from '../Shared/ActionButton.vue'
export default {
  name: 'JobSearchForm',
  components: {
    ActionButton,
  },
  data() {
    return {
      role: '',
      location: '',
    }
  },
}
</script>
