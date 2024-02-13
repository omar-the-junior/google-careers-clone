import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { createTestingPinia } from '@pinia/testing'

import { useUserStore } from '@/stores/user'
import JobFiltersSidebarSkills from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarSkills.vue'

describe('JobFiltersSidebarSkills', () => {
  const renderJobFiltersSidebarSkills = () => {
    const pinia = createTestingPinia()
    const userStore = useUserStore()
    render(JobFiltersSidebarSkills, {
      global: {
        plugins: [pinia],
      },
    })

    return { userStore }
  }
  it('populates search input from store', async () => {
    const { userStore } = renderJobFiltersSidebarSkills()
    userStore.skillsSearchTerm = 'programmer'

    const input = await screen.findByRole<HTMLInputElement>('textbox')
    expect(input.value).toBe('programmer')
  })

  it('writes user input to store', async () => {
    const { userStore } = renderJobFiltersSidebarSkills()
    userStore.skillsSearchTerm = ''
    const input = screen.getByRole<HTMLInputElement>('textbox')
    await userEvent.type(input, 'V')
    // click outside the input any where to trigger lazy input
    await userEvent.click(document.body)
    expect(userStore.updateSkillsSearchTerm).toHaveBeenCalledWith('V')
  })

  it('removes white space from start and end of user input', async () => {
    const { userStore } = renderJobFiltersSidebarSkills()
    userStore.skillsSearchTerm = ''
    const input = screen.getByRole<HTMLInputElement>('textbox')
    await userEvent.type(input, '       V    ')
    // click outside the input any where to trigger lazy input
    await userEvent.click(document.body)
    expect(userStore.updateSkillsSearchTerm).toHaveBeenCalledWith('V')
  })
})
