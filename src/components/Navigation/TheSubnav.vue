<script setup lang="ts">
import { useJobsStore } from '@/stores/jobs'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const jobsStore = useJobsStore()

const filteredJobs = computed(() => jobsStore.filteredJobs)

const onJobResultsPage = computed(() => route.name === 'JobResults')
</script>

<template>
  <div
    class="h-16 w-full border-b border-solid border-brand-gray-1 bg-white"
  >
    <div
      v-if="onJobResultsPage"
      class="flex h-full items-center px-8"
    >
      <font-awesome-icon :icon="['fas', 'search']" class="mr-3" />
      <span
        ><span class="text-brand-green-1">{{
          filteredJobs.length
        }}</span>
        jobs matched</span
      >
    </div>
  </div>
</template>
