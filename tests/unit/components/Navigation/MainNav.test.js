import {
  render,
  screen,
} from '@testing-library/vue'

import MainNav from '@/components/Navigation/MainNav.vue'
import userEvent from '@testing-library/user-event'

describe('MainNav', () => {
  const renderMainNav = () => {
    render(MainNav, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
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
      render(MainNav, {
        global: {
          stubs: {
            FontAwesomeIcon: true,
          },
        },
      })
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
      await userEvent.click(loginButton)

      profileImage = screen.getByRole('img', {
        name: /user profile image/i,
      })
      expect(profileImage).toBeInTheDocument()
    })
  })
})
