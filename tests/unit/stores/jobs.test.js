import {
  createPinia,
  setActivePinia,
} from 'pinia'

import { useJobsStore } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'
import axios from 'axios'

vi.mock('axios')

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

  describe('FETCH_JOBS', () => {
    it('makes API request and stores received jobs', async () => {
      const jobs = [
        { id: 1, title: 'Frontend Developer' },
        { id: 2, title: 'Backend Developer' },
      ]
      axios.get.mockResolvedValue({
        data: jobs,
      })

      const store = useJobsStore()

      await store.FETCH_JOBS()

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
          { id: 1, organization: 'Google' },
          { id: 2, organization: 'Google' },
          { id: 3, organization: 'Facebook' },
        ]

        expect(store.uniqueOrganizations).toEqual(
          new Set(['Google', 'Facebook'])
        )
      })
    })

    describe('uniqueJobTypes', () => {
      it('finds unique job types from list of jobs', () => {
        const store = useJobsStore()
        store.jobs = [
          { id: 1, jobType: 'Full Time' },
          { id: 2, jobType: 'Full Time' },
          { id: 3, jobType: 'Part Time' },
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

          const job = {
            id: 1,
            organization: 'Google',
          }

          const result =
            store.includeJobByOrganization(job)

          expect(result).toBe(true)
        })
      })
      it('identifies if job is associated with the selected organizations', () => {
        const userStore = useUserStore()
        userStore.selectedOrganizations = [
          'Google',
          'Meta',
        ]
        const store = useJobsStore()

        const job = {
          id: 1,
          organization: 'Google',
        }

        const result =
          store.includeJobByOrganization(job)

        expect(result).toBe(true)
      })
    })

    describe('includeJobByJobType', () => {
      describe('when the user has not selected any job types', () => {
        it('includes job', () => {
          const userStore = useUserStore()
          userStore.selectedJobTypes = []
          const store = useJobsStore()

          const job = {
            id: 1,
            jobtype: 'Full Time',
          }

          const result =
            store.includeJobByOrganization(job)

          expect(result).toBe(true)
        })
      })
      it('identifies if job is associated with the selected job types', () => {
        const userStore = useUserStore()
        userStore.selectedJobTypes = [
          'Full Time',
          'Part Time',
        ]
        const store = useJobsStore()

        const job = {
          id: 1,
          jobtype: 'Full Time',
        }

        const result =
          store.includeJobByOrganization(job)

        expect(result).toBe(true)
      })
    })
  })
})
