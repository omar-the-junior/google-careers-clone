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

  describe('filteredJobsByOrganizations', () => {
    it('identifies jobs that are associated with the given organizations', () => {
      const jobsStore = useJobsStore()

      jobsStore.jobs = [
        { id: 1, organization: 'Google' },
        { id: 2, organization: 'Meta' },
        { id: 3, organization: 'Amazon' },
      ]
      const userStore = useUserStore()

      userStore.selectedOrganizations = [
        'Google',
        'Meta',
      ]

      const result =
        jobsStore.filteredJobsByOrganizations

      expect(result).toEqual([
        { id: 1, organization: 'Google' },
        { id: 2, organization: 'Meta' },
      ])
    })

    describe('when the user has not selected any organizations', () => {
      it('returns all jobs', () => {
        const jobsStore = useJobsStore()

        jobsStore.jobs = [
          { id: 1, organization: 'Google' },
          { id: 2, organization: 'Meta' },
          { id: 3, organization: 'Amazon' },
        ]
        const userStore = useUserStore()

        userStore.selectedOrganizations = []

        const result =
          jobsStore.filteredJobsByOrganizations

        expect(result).toEqual([
          { id: 1, organization: 'Google' },
          { id: 2, organization: 'Meta' },
          { id: 3, organization: 'Amazon' },
        ])
      })
    })
  })
})
