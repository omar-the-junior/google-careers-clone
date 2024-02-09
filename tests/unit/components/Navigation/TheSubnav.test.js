import {
  render,
  screen,
} from '@testing-library/vue'

import TheSubnav from '@/components/Navigation/TheSubnav.vue'
import { createTestingPinia } from '@pinia/testing'
import { useJobsStore } from '@/stores/jobs'
describe('TheSubnav', () => {
  const renderTheSubnav = (routeName) => {
    const pinia = createTestingPinia()
    const jobsStore = useJobsStore()
    render(TheSubnav, {
      global: {
        plugins: [pinia],
        mocks: {
          $route: {
            name: routeName,
          },
        },
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    })
    return { jobsStore }
  }
  describe('Whe user is on jobs page', () => {
    it('displays job count', async () => {
      const { jobsStore } =
        renderTheSubnav('JobResults')

      const numberOfJobs = 16
      jobsStore.filteredJobsByOrganizations =
        Array(numberOfJobs).fill({})

      const jobCount =
        await screen.findByText(numberOfJobs)

      expect(jobCount).toBeInTheDocument()
    })
  })
  describe('When user is not on jobs page', () => {
    it('does not display job count', () => {
      const { jobsStore } =
        renderTheSubnav('Home')
      const numberOfJobs = 16

      jobsStore.filteredJobsByOrganizations =
        Array(numberOfJobs).fill({})

      const jobCount =
        screen.queryByText(numberOfJobs)

      expect(jobCount).not.toBeInTheDocument()
    })
  })
})
