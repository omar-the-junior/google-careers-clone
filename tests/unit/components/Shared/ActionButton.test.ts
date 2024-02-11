import ActionButton from '@/components/Shared/ActionButton.vue'
import { render, screen } from '@testing-library/vue'

describe('ActionButton', () => {
  it('renders text', () => {
    render(ActionButton, {
      props: {
        text: 'Click me',
        type: 'primary',
      },
    })

    const button = screen.getByRole('button', {
      name: /click me/i,
    })

    expect(button).toBeInTheDocument()
  })

  it('applies one of several styles to button', () => {
    render(ActionButton, {
      props: {
        text: 'Click me',
        type: 'primary',
      },
    })

    const button = screen.getByRole('button', {
      name: /click me/i,
    })

    expect(button).toHaveClass('primary')
  })
})
