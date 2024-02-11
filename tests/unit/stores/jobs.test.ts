import { createPinia, setActivePinia } from 'pinia'

import { useJobsStore } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'
import axios from 'axios'
import { createJob } from '../../utils/createJob'

import type { Mock } from 'vitest'

vi.mock('axios')
const axiosGetMock = axios.get as Mock
describe('state', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('stores job listings', () => {
    const store = useJobsStore()
    expect(store.jobs).toEqual([])
  })
})

describe('actions', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('fetchJobs', () => {
    it('makes API request and stores received jobs', async () => {
      const jobs = [
        { id: 1, title: 'Frontend Developer' },
        { id: 2, title: 'Backend Developer' },
      ]
      axiosGetMock.mockResolvedValue({
        data: jobs,
      })

      const store = useJobsStore()

      await store.fetchJobs()

      expect(store.jobs).toEqual(jobs)
    })
  })

  describe('getters', () => {
    beforeEach(() => {
      setActivePinia(createPinia())
    })

    describe('uniqueOrganizations', () => {
      it('finds unique organizations from list of jobs', () => {
        const store = useJobsStore()
        store.jobs = [
          createJob({ id: 1, organization: 'Google' }),
          createJob({ id: 2, organization: 'Google' }),
          createJob({ id: 3, organization: 'Meta' }),
        ]

        expect(store.uniqueOrganizations).toEqual(
          new Set(['Google', 'Meta'])
        )
      })
    })

    describe('uniqueJobTypes', () => {
      it('finds unique job types from list of jobs', () => {
        const store = useJobsStore()
        store.jobs = [
          createJob({ id: 1, jobType: 'Full Time' }),
          createJob({ id: 2, jobType: 'Full Time' }),
          createJob({ id: 3, jobType: 'Part Time' }),
        ]

        expect(store.uniqueJobTypes).toEqual(
          new Set(['Full Time', 'Part Time'])
        )
      })
    })

    describe('includeJobByOrganization', () => {
      describe('when the user has not selected any organizations', () => {
        it('includes job', () => {
          const userStore = useUserStore()
          userStore.selectedOrganizations = []
          const store = useJobsStore()

          const job = createJob({
            id: 1,
            organization: 'Google',
          })

          const result = store.includeJobByOrganization(job)

          expect(result).toBe(true)
        })
      })
      it('identifies if job is associated with the selected organizations', () => {
        const userStore = useUserStore()
        userStore.selectedOrganizations = ['Google', 'Meta']
        const store = useJobsStore()

        const job = createJob({
          id: 1,
          organization: 'Google',
        })

        const result = store.includeJobByOrganization(job)

        expect(result).toBe(true)
      })
    })

    describe('includeJobByJobType', () => {
      describe('when the user has not selected any job types', () => {
        it('includes job', () => {
          const userStore = useUserStore()
          userStore.selectedJobTypes = []
          const store = useJobsStore()

          const job = createJob({
            id: 1,
            jobType: 'Full Time',
          })

          const result = store.includeJobByJobType(job)

          expect(result).toBe(true)
        })
      })
      it('identifies if job is associated with the selected job types', () => {
        const userStore = useUserStore()
        userStore.selectedJobTypes = ['Full Time', 'Part Time']
        const store = useJobsStore()

        const job = createJob({
          id: 1,
          jobType: 'Full Time',
        })

        const result = store.includeJobByJobType(job)

        expect(result).toBe(true)
      })
    })
  })
})
