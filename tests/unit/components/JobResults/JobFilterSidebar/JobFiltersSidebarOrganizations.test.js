import {
  render,
  screen,
} from '@testing-library/vue'

import userEvent from '@testing-library/user-event'

import { createTestingPinia } from '@pinia/testing'

import JobFiltersSidebarOrganizations from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue'

import { useJobsStore } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'
describe('jobFiltersSidebarOrganization', () => {
  const renderJobsFiltersSidebarOrganizations =
    () => {
      const pinia = createTestingPinia()
      const jobsStore = useJobsStore()
      const userStore = useUserStore()
      const $router = {
        push: vi.fn(),
      }

      render(JobFiltersSidebarOrganizations, {
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

  it('renders unique list of organizations from jobs', async () => {
    const { jobsStore } =
      renderJobsFiltersSidebarOrganizations()

    jobsStore.uniqueOrganizations = new Set([
      'Organization 1',
      'Organization 2',
    ])

    const button = screen.getByRole('button', {
      name: /organizations/i,
    })

    await userEvent.click(button)
    const organizationListItems =
      screen.getAllByRole('listitem')

    const organizations =
      organizationListItems.map(
        (node) => node.textContent
      )

    expect(organizations).toEqual([
      'Organization 1',
      'Organization 2',
    ])
  })

  describe('when user selects an organization checkbox', () => {
    it('communicates that user has selected checkbox for organization', async () => {
      const { jobsStore, userStore } =
        renderJobsFiltersSidebarOrganizations()

      jobsStore.uniqueOrganizations = new Set([
        'google',
        'meta',
      ])

      const button = screen.getByRole('button', {
        name: /organizations/i,
      })

      await userEvent.click(button)

      const googleCheckbox = screen.getByRole(
        'checkbox',
        {
          name: /google/i,
        }
      )

      await userEvent.click(googleCheckbox)

      expect(
        userStore.addSelectedOrganization
      ).toHaveBeenCalledWith(['google'])
    })
  })

  it('navigates user to job results page to see fresh batch of filtered jobs', async () => {
    const { jobsStore, $router } =
      renderJobsFiltersSidebarOrganizations()

    jobsStore.uniqueOrganizations = new Set([
      'google',
    ])

    const button = screen.getByRole('button', {
      name: /organizations/i,
    })

    await userEvent.click(button)

    const googleCheckbox = screen.getByRole(
      'checkbox',
      {
        name: /google/i,
      }
    )

    await userEvent.click(googleCheckbox)

    expect($router.push).toHaveBeenCalledWith({
      name: 'JobResults',
    })
  })
})
