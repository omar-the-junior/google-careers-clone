import {
  createPinia,
  setActivePinia,
} from 'pinia'

import { useJobsStore } from '@/stores/jobs'
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
})
