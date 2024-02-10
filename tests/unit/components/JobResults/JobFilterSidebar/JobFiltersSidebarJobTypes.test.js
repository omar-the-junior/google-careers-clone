import {
  render,
  screen,
} from '@testing-library/vue'

import userEvent from '@testing-library/user-event'

import { createTestingPinia } from '@pinia/testing'

import JobFiltersSidebarJobTypes from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarJobTypes.vue'

import { useJobsStore } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'
describe('jobFiltersSidebarOrganization', () => {
  const renderJobsFiltersSidebarJobTypes = () => {
    const pinia = createTestingPinia()
    const jobsStore = useJobsStore()
    const userStore = useUserStore()
    const $router = {
      push: vi.fn(),
    }
    render(JobFiltersSidebarJobTypes, {
      global: {
        plugins: [pinia],
        mocks: {
          $router,
        },
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    })

    return { jobsStore, userStore, $router }
  }

  it('renders unique list of job types from jobs', async () => {
    const { jobsStore } =
      renderJobsFiltersSidebarJobTypes()

    jobsStore.uniqueJobTypes = new Set([
      'Full Time',
      'Part Time',
    ])

    const button = screen.getByRole('button', {
      name: /job types/i,
    })

    await userEvent.click(button)
    const jobTypesListItems =
      screen.getAllByRole('listitem')

    const jobTypes = jobTypesListItems.map(
      (node) => node.textContent
    )

    expect(jobTypes).toEqual([
      'Full Time',
      'Part Time',
    ])
  })

  describe('When user clicks checkbox', () => {
    it('communicates that user has selected checkbox for Job type', async () => {
      const { jobsStore, userStore } =
        renderJobsFiltersSidebarJobTypes()

      jobsStore.uniqueJobTypes = new Set([
        'Full Time',
        'Part Time',
      ])

      const button = screen.getByRole('button', {
        name: /job types/i,
      })

      await userEvent.click(button)

      const fullTimeCheckbox = screen.getByRole(
        'checkbox',
        {
          name: /full time/i,
        }
      )

      await userEvent.click(fullTimeCheckbox)
      expect(
        userStore.addSelectedJobTypes
      ).toHaveBeenCalledWith(['Full Time'])
    })

    it('navigates user to job results page to see fresh batch of filtered jobs', async () => {
      const { jobsStore, $router } =
        renderJobsFiltersSidebarJobTypes()

      jobsStore.uniqueJobTypes = new Set([
        'Full Time',
      ])

      const button = screen.getByRole('button', {
        name: /job types/i,
      })

      await userEvent.click(button)

      const fullTimeCheckbox = screen.getByRole(
        'checkbox',
        {
          name: /full time/i,
        }
      )

      await userEvent.click(fullTimeCheckbox)

      expect($router.push).toHaveBeenCalledWith({
        name: 'JobResults',
      })
    })
  })
})
