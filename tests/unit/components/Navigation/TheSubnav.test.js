import {
  render,
  screen,
} from '@testing-library/vue'
import TheSubnav from '@/components/Navigation/TheSubnav.vue'
describe('TheSubnav', () => {
  describe('Whe user is on jobs page', () => {
    it('displays job count', () => {
      render(TheSubnav, {
        global: {
          stubs: {
            FontAwesomeIcon: true,
          },
        },
        data() {
          return {
            onJobResultsPage: true,
          }
        },
      })

      const jobCount = screen.getByText('1653')

      expect(jobCount).toBeInTheDocument()
    })
  })
  describe('When user is not on jobs page', () => {
    it('does not display job count', () => {
      render(TheSubnav, {
        global: {
          stubs: {
            FontAwesomeIcon: true,
          },
        },
        data() {
          return {
            onJobResultsPage: false,
          }
        },
      })

      const jobCount = screen.queryByText('1653')

      expect(jobCount).not.toBeInTheDocument()
    })
  })
})