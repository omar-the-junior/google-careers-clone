import {
  render,
  screen,
} from '@testing-library/vue'

import MainNav from '@/components/Navigation/MainNav.vue'
import userEvent from '@testing-library/user-event'
import { RouterLinkStub } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useUserStore } from '@/stores/user'

describe('MainNav', () => {
  const pinia = createTestingPinia()
  const renderMainNav = () => {
    const $route = {
      name: 'Home',
    }

    render(MainNav, {
      global: {
        plugins: [pinia],
        mocks: {
          $route,
        },
        stubs: {
          FontAwesomeIcon: true,
          RouterLink: RouterLinkStub,
        },
      },
    })
  }

  it('Displays company name', () => {
    renderMainNav()
    const companyName = screen.getByText(
      /google careers/i
    )
    expect(companyName).toBeInTheDocument()
  })

  it('Displays menu items for navigation', () => {
    renderMainNav()
    const navigationMenuItems =
      screen.getAllByRole('listitem')
    const navigationMenuTexts =
      navigationMenuItems.map(
        // textContent gets the nested text content inside an element
        (item) => item.textContent
      )
    expect(navigationMenuTexts).toEqual([
      'Teams',
      'Locations',
      'Life at Google Corp',
      'How we hire',
      'Students',
      'Jobs',
    ])
  })

  describe('When the user logs in', () => {
    it('displays user profile picture', async () => {
      renderMainNav()

      const userStore = useUserStore()

      let profileImage = screen.queryByRole(
        'img',
        {
          name: /user profile image/i,
        }
      )
      expect(profileImage).not.toBeInTheDocument()

      const loginButton = screen.getByRole(
        'button',
        { name: /sign in/i }
      )
      userStore.isLoggedIn = true
      await userEvent.click(loginButton)

      expect(
        userStore.login
      ).toHaveBeenCalledTimes(1)

      profileImage = screen.getByRole('img', {
        name: /user profile image/i,
      })
      expect(profileImage).toBeInTheDocument()
    })
  })
})
