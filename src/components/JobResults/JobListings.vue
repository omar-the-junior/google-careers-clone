<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <ol>
      <job-listing
        v-for="job in displayJobs"
        :key="job.id"
        :job="job"
      />
    </ol>

    <div class="mx-auto mt-8">
      <div class="flex flex-nowrap">
        <p class="flex-grow text-sm">
          Page {{ currentPage }}
        </p>

        <div
          class="flex items-center justify-center"
        >
          <router-link
            v-if="previousPage"
            role="link"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            :to="{
              name: 'JobResults',
              query: { page: previousPage },
            }"
          >
            Previous
          </router-link>
          <router-link
            v-if="nextPage"
            role="link"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            :to="{
              name: 'JobResults',
              query: { page: nextPage },
            }"
          >
            Next
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions, mapState } from 'pinia'

import { useJobsStore } from '@/stores/jobs'
import JobListing from './JobListing.vue'
export default {
  name: 'JobListings',
  components: {
    JobListing,
  },
  computed: {
    currentPage() {
      return Number.parseInt(
        this.$route.query?.page || '1'
      )
    },
    previousPage() {
      const previousPage = this.currentPage - 1
      const firstPage = 1

      return previousPage >= firstPage
        ? previousPage
        : undefined
    },
    ...mapState(useJobsStore, {
      filteredJobsByOrganizations:
        'filteredJobsByOrganizations',
      nextPage() {
        const nextPage = this.currentPage + 1
        const maxPage = Math.ceil(
          this.filteredJobsByOrganizations
            .length / 10
        )
        return nextPage <= maxPage
          ? nextPage
          : undefined
      },
      displayJobs() {
        const firstJobIndex =
          (this.currentPage - 1) * 10
        const lastJobIndex = this.currentPage * 10
        return this.filteredJobsByOrganizations.slice(
          firstJobIndex,
          lastJobIndex
        )
      },
    }),
  },
  async mounted() {
    await this.FETCH_JOBS()
  },
  methods: {
    ...mapActions(useJobsStore, ['FETCH_JOBS']),
  },
}
</script>
