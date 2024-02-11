import { render, screen } from '@testing-library/vue'

import userEvent from '@testing-library/user-event'

import { createTestingPinia } from '@pinia/testing'

import JobFiltersSidebarCheckboxGroup from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue'

import { useRouter } from 'vue-router'
import type { Mock } from 'vitest'

vi.mock('vue-router')

const useRouterMock = useRouter as Mock
describe('jobFiltersSidebarCheckboxGroup', () => {
  interface Props {
    header: string
    uniqueValues: Set<string>
    action: Function
  }

  const createProps = (props: Partial<Props> = {}) => ({
    header: 'Some header',
    uniqueValues: new Set(['a', 'b', 'c']),
    action: vi.fn(),
    ...props,
  })

  const renderJobsFiltersSidebarCheckboxGroup = (props: Props) => {
    const pinia = createTestingPinia()

    render(JobFiltersSidebarCheckboxGroup, {
      props,
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    })
  }

  it('renders unique list of job types from jobs', async () => {
    const props = createProps({
      header: 'job types',
      uniqueValues: new Set(['Full Time', 'Part Time']),
    })
    renderJobsFiltersSidebarCheckboxGroup(props)

    const button = screen.getByRole('button', {
      name: /job types/i,
    })

    await userEvent.click(button)
    const jobTypesListItems = screen.getAllByRole('listitem')

    const jobTypes = jobTypesListItems.map((node) => node.textContent)

    expect(jobTypes).toEqual(['Full Time', 'Part Time'])
  })

  describe('When user clicks checkbox', () => {
    it('communicates that user has selected checkbox for Value', async () => {
      useRouterMock.mockReturnValue({ push: vi.fn() })
      const action = vi.fn()
      const props = createProps({
        header: 'job types',
        uniqueValues: new Set(['Full Time', 'Part Time']),
        action,
      })
      renderJobsFiltersSidebarCheckboxGroup(props)

      const button = screen.getByRole('button', {
        name: /job types/i,
      })

      await userEvent.click(button)

      const fullTimeCheckbox = screen.getByRole('checkbox', {
        name: /full time/i,
      })

      await userEvent.click(fullTimeCheckbox)
      expect(action).toHaveBeenCalledWith(['Full Time'])
    })

    it('navigates user to job results page to see fresh batch of filtered jobs', async () => {
      const push = vi.fn()
      useRouterMock.mockReturnValue({
        push,
      })

      const props = createProps({
        header: 'job types',
        uniqueValues: new Set(['Full Time', 'Part Time']),
      })

      renderJobsFiltersSidebarCheckboxGroup(props)

      const button = screen.getByRole('button', {
        name: /job types/i,
      })

      await userEvent.click(button)

      const fullTimeCheckbox = screen.getByRole('checkbox', {
        name: /full time/i,
      })

      await userEvent.click(fullTimeCheckbox)

      expect(push).toHaveBeenCalledWith({
        name: 'JobResults',
      })
    })
  })
})
