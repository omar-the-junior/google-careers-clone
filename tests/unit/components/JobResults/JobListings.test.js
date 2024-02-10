import {
  render,
  screen,
} from '@testing-library/vue'

import JobListings from '@/components/JobResults/JobListings.vue'
import { RouterLinkStub } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useJobsStore } from '@/stores/jobs'
import { useRoute } from 'vue-router'

vi.mock('axios')
vi.mock('vue-router')
describe('JobListings', () => {
  const renderJobListings = () => {
    const pinia = createTestingPinia()
    const jobsStore = useJobsStore()

    jobsStore.filteredJobs = Array(15).fill({})

    render(JobListings, {
      global: {
        plugins: [pinia],
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    return { jobsStore }
  }
  it('fetches jobs', () => {
    useRoute.mockReturnValue({ query: {} })
    const { jobsStore } = renderJobListings()

    expect(jobsStore.fetchJobs).toHaveBeenCalled()
  })

  it('displays maximum of 10 jobs', async () => {
    useRoute.mockReturnValue({ query: {} })
    const { jobsStore } = renderJobListings()

    jobsStore.filteredJobs = Array(15).fill({})
    const jobListings =
      await screen.findAllByRole('listitem')

    expect(jobListings).toHaveLength(10)
  })

  describe('when params exclude page number', () => {
    it('displays page number 1', () => {
      useRoute.mockReturnValue({ query: {} })

      renderJobListings()

      expect(
        screen.getByText(/page 1/i)
      ).toBeInTheDocument()
    })
  })

  describe('when params include page number', () => {
    it('displays page number', () => {
      useRoute.mockReturnValue({
        query: { page: 3 },
      })

      renderJobListings()

      expect(
        screen.getByText(/page 3/i)
      ).toBeInTheDocument()
    })
  })

  describe('when user is on first page', () => {
    it("doesn't show link to previous page", async () => {
      useRoute.mockReturnValue({
        query: {
          page: 1,
        },
      })

      const { jobsStore } = renderJobListings()
      jobsStore.filteredJobs = Array(15).fill({})

      await screen.findAllByRole('listitem')

      const previousLink = screen.queryByRole(
        'link',
        {
          name: /previous/i,
        }
      )
      expect(previousLink).not.toBeInTheDocument()
    })

    it('shows link to next page', async () => {
      useRoute.mockReturnValue({
        query: {
          page: 1,
        },
      })

      const { jobsStore } = renderJobListings()

      jobsStore.filteredJobs = Array(15).fill({})
      await screen.findAllByRole('listitem')

      const nextLink = screen.getByRole('link', {
        name: /next/i,
      })
      expect(nextLink).toBeInTheDocument()
    })
  })
  describe('When user is on last page', () => {
    it("doesn't show link to next page", async () => {
      useRoute.mockReturnValue({
        query: {
          page: 2,
        },
      })

      const { jobsStore } = renderJobListings()

      jobsStore.filteredJobs = Array(15).fill({})
      await screen.findAllByRole('listitem')

      const nextLink = screen.queryByRole(
        'link',
        {
          name: /next/i,
        }
      )
      expect(nextLink).not.toBeInTheDocument()
    })

    it('shows link to previous page', async () => {
      useRoute.mockReturnValue({
        query: {
          page: 2,
        },
      })

      const { jobsStore } = renderJobListings()
      jobsStore.filteredJobs = Array(15).fill({})

      await screen.findAllByRole('listitem')

      const previousLink = screen.getByRole(
        'link',
        {
          name: /previous/i,
        }
      )
      expect(previousLink).toBeInTheDocument()
    })
  })
})
