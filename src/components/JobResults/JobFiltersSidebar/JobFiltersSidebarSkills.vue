<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { computed } from 'vue'

const userStore = useUserStore()

const skillsSearchTerm = computed<string>({
  get() {
    return userStore.skillsSearchTerm
  },
  set(term) {
    userStore.updateSkillsSearchTerm(term)
  },
})
</script>

<template>
  <div class="mt-2">
    <input
      v-model.lazy.trim="skillsSearchTerm"
      type="text"
      class="h-12 w-full rounded border-solid border-brand-gray-1 p-3 text-base shadow-gray"
      placeholder="Computer programming, Finance degree"
    />
  </div>
</template>
