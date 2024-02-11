import { render, screen } from '@testing-library/vue'

import HeaderContainer from '@/components/Shared/HeaderContainer.vue'

describe('HeaderContainer', () => {
  it('allows parent component to provider title content', () => {
    render(HeaderContainer, {
      slots: {
        title: '<h2>my title</h2>',
      },
    })

    expect(screen.getByText('my title')).toBeInTheDocument()
  })

  it('allows parent component to provide subtitle content', () => {
    render(HeaderContainer, {
      slots: {
        subtitle: '<h3>my subtitle</h3>',
      },
    })

    expect(screen.getByText('my subtitle')).toBeInTheDocument()
  })
})
