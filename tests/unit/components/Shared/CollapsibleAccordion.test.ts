import { render, screen } from '@testing-library/vue'

import userEvent from '@testing-library/user-event'

import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue'

describe('CollapsibleAccordion', () => {
  const renderCollapsibleAccordion = async (config = {}) => {
    render(CollapsibleAccordion, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
        },
      },
      slots: {
        default: '<h3>My nested child</h3>',
      },
      props: {
        header: 'My category',
      },
      ...config,
    })
  }

  it('renders child content', async () => {
    renderCollapsibleAccordion()

    expect(
      screen.queryByText('My nested child')
    ).not.toBeInTheDocument()

    const button = screen.getByRole('button', {
      name: /my category/i,
    })

    await userEvent.click(button)
    expect(screen.getByText('My nested child')).toBeInTheDocument()
  })

  describe('when parent does not provide custom child content', () => {
    it('render default content', async () => {
      renderCollapsibleAccordion({
        slots: null,
      })
      const button = screen.getByRole('button', {
        name: /my category/i,
      })
      await userEvent.click(button)

      expect(
        screen.getByText('No content provided')
      ).toBeInTheDocument()
    })
  })
})
