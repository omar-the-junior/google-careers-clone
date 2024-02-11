import getJobs from '@/api/getJobs'
import { defineStore } from 'pinia'
import { useUserStore } from './user'
import type { Job } from '@/api/types'

export interface JobsState {
  jobs: Job[]
}

export const useJobsStore = defineStore('jobs', {
  state: (): JobsState => ({
    jobs: [],
  }),
  actions: {
    async fetchJobs() {
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
    uniqueJobTypes(state) {
      const uniqueJobTypes = new Set(
        state.jobs.map((job) => job.jobType)
      )
      return uniqueJobTypes
    },
    includeJobByOrganization() {
      return (job: Job) => {
        const userStore = useUserStore()
        if (!userStore.selectedOrganizations.length) {
          return true
        }
        return userStore.selectedOrganizations.includes(
          job.organization
        )
      }
    },
    includeJobByJobType() {
      return (job: Job) => {
        const userStore = useUserStore()
        if (!userStore.selectedJobTypes.length) {
          return true
        }
        return userStore.selectedJobTypes.includes(job.jobType)
      }
    },
    filteredJobs(state): Job[] {
      const userStore = useUserStore()
      let filteredJobs = state.jobs
      if (userStore.selectedJobTypes.length) {
        filteredJobs = filteredJobs.filter(this.includeJobByJobType)
      }
      if (userStore.selectedOrganizations.length) {
        filteredJobs = filteredJobs.filter(
          this.includeJobByOrganization
        )
      }
      return filteredJobs
    },
  },
})
