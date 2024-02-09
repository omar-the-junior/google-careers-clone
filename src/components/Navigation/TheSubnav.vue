<template>
  <div
    class="h-16 w-full border-b border-solid border-brand-gray-1 bg-white"
  >
    <div
      v-if="onJobResultsPage"
      class="flex h-full items-center px-8"
    >
      <font-awesome-icon
        :icon="['fas', 'search']"
        class="mr-3"
      />
      <span
        ><span class="text-brand-green-1">{{
          filteredJobsByOrganizations.length
        }}</span>
        jobs matched</span
      >
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useJobsStore } from '@/stores/jobs'

export default {
  name: 'TheSubnav',
  computed: {
    ...mapState(useJobsStore, [
      'filteredJobsByOrganizations',
    ]),
    onJobResultsPage() {
      return this.$route.name === 'JobResults'
    },
  },
}
</script>
