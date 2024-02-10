import {
  render,
  screen,
} from '@testing-library/vue'

import TheSubnav from '@/components/Navigation/TheSubnav.vue'
import { createTestingPinia } from '@pinia/testing'
import { useJobsStore } from '@/stores/jobs'
import { useRoute } from 'vue-router'
vi.mock('vue-router')
describe('TheSubnav', () => {
  const renderTheSubnav = () => {
    const pinia = createTestingPinia()
    const jobsStore = useJobsStore()
    render(TheSubnav, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    })
    return { jobsStore }
  }
  describe('Whe user is on jobs page', () => {
    it('displays job count', async () => {
      useRoute.mockReturnValue({
        name: 'JobResults',
      })
      const { jobsStore } = renderTheSubnav()

      const numberOfJobs = 16
      jobsStore.filteredJobs = Array(
        numberOfJobs
      ).fill({})

      const jobCount =
        await screen.findByText(numberOfJobs)

      expect(jobCount).toBeInTheDocument()
    })
  })
  describe('When user is not on jobs page', () => {
    it('does not display job count', () => {
      useRoute.mockReturnValue({
        name: 'Home',
      })
      const { jobsStore } = renderTheSubnav()
      const numberOfJobs = 16

      jobsStore.filteredJobs = Array(
        numberOfJobs
      ).fill({})

      const jobCount =
        screen.queryByText(numberOfJobs)

      expect(jobCount).not.toBeInTheDocument()
    })
  })
})
