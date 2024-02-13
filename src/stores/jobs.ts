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
        return userStore.selectedOrganizations.includes(
          job.organization
        )
      }
    },
    includeJobByJobType() {
      return (job: Job) => {
        const userStore = useUserStore()
        return userStore.selectedJobTypes.includes(job.jobType)
      }
    },
    includeJobByDegree() {
      return (job: Job) => {
        const userStore = useUserStore()
        return userStore.selectedDegrees.includes(job.degree)
      }
    },
    includeJobBySkill() {
      return (job: Job) => {
        const userStore = useUserStore()
        return job.title
          .toLowerCase()
          .includes(userStore.skillsSearchTerm.toLowerCase().trim())
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
      if (userStore.selectedDegrees.length) {
        filteredJobs = filteredJobs.filter(this.includeJobByDegree)
      }
      if (userStore.skillsSearchTerm.length) {
        filteredJobs = filteredJobs.filter(this.includeJobBySkill)
      }
      return filteredJobs
    },
  },
})
