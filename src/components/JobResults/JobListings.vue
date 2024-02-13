<script setup lang="ts">
import JobListing from './JobListing.vue'
import { computed, onMounted } from 'vue'

import { useJobsStore } from '@/stores/jobs'
import { useDegreesStore } from '@/stores/degrees'

import { useRoute } from 'vue-router'

import usePreviousAndNextPages from '@/composables/usePreviousAndNextPages'

const route = useRoute()

const jobsStore = useJobsStore()
const degreesStore = useDegreesStore()

const filteredJobs = computed(() => jobsStore.filteredJobs)

const currentPage = computed(() =>
  Number.parseInt((route.query?.page as string) || '1')
)

const maxPage = computed(() =>
  Math.ceil(filteredJobs.value.length / 10)
)

const { nextPage, previousPage } = usePreviousAndNextPages(
  currentPage,
  maxPage
)
onMounted(degreesStore.fetchDegrees)
onMounted(jobsStore.fetchJobs)

const displayJobs = computed(() => {
  const firstJobIndex = (currentPage.value - 1) * 10
  const lastJobIndex = firstJobIndex + 10
  return filteredJobs.value.slice(firstJobIndex, lastJobIndex)
})
</script>

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
        <p class="flex-grow text-sm">Page {{ currentPage }}</p>

        <div class="flex items-center justify-center">
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
