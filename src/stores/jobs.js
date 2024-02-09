import getJobs from '@/api/getJobs'
import { defineStore } from 'pinia'
import { useUserStore } from './user'
export const useJobsStore = defineStore('jobs', {
  state: () => ({
    jobs: [],
  }),
  actions: {
    async FETCH_JOBS() {
      const jobs = await getJobs()

      this.jobs = jobs
    },
  },
  getters: {
    uniqueOrganizations(state) {
      const uniqueOrganizations = new Set(
        state.jobs.map((job) => job.organization)
      )

      return uniqueOrganizations
    },
    filteredJobsByOrganizations(state) {
      const userStore = useUserStore()

      if (
        !userStore.selectedOrganizations.length
      ) {
        return state.jobs
      }
      return state.jobs.filter((job) =>
        userStore.selectedOrganizations.includes(
          job.organization
        )
      )
    },
  },
})
