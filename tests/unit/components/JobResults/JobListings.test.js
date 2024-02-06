import {
  render,
  screen,
} from '@testing-library/vue'

import JobListings from '@/components/JobResults/JobListings.vue'
import axios from 'axios'
import { RouterLinkStub } from '@vue/test-utils'

vi.mock('axios')
describe('JobListings', () => {
  const createRoute = (queryParams = {}) => ({
    query: {
      page: '5',
      ...queryParams,
    },
  })

  const renderJobListings = ($route) => {
    render(JobListings, {
      global: {
        mocks: {
          $route,
        },
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })
  }
  it('fetches jobs', () => {
    axios.get.mockResolvedValue({
      data: [],
    })
    const route = createRoute()
    renderJobListings(route)
    expect(axios.get).toHaveBeenCalledWith(
      `http://myfakeapi.com/jobs`
    )
  })

  it('displays maximum of 10 jobs', async () => {
    axios.get.mockResolvedValue({
      data: Array(15).fill({}),
    })
    const route = createRoute({ page: '1' })
    renderJobListings(route)
    const jobListings =
      await screen.findAllByRole('listitem')

    expect(jobListings).toHaveLength(10)
  })

  describe('when params exclude page number', () => {
    it('displays page number 1', () => {
      const $route = createRoute({ page: '1' })
      renderJobListings($route)

      expect(
        screen.getByText(/page 1/i)
      ).toBeInTheDocument()
    })
  })

  describe('when params include page number', () => {
    it('displays page number', () => {
      const $route = createRoute({ page: '3' })
      renderJobListings($route)

      expect(
        screen.getByText(/page 3/i)
      ).toBeInTheDocument()
    })
  })

  describe('when user is on first page', () => {
    it("doesn't show link to previous page", async () => {
      axios.get.mockResolvedValue({
        data: Array(15).fill({}),
      })

      const $route = createRoute({ page: '1' })
      renderJobListings($route)
      await screen.findAllByRole('listitem')

      const previousLink = screen.queryByRole(
        'link',
        {
          name: /previous/i,
        }
      )
      expect(previousLink).not.toBeInTheDocument()
    })

    it('shows link to next page', async () => {
      axios.get.mockResolvedValue({
        data: Array(15).fill({}),
      })

      const $route = createRoute({ page: '1' })
      renderJobListings($route)

      await screen.findAllByRole('listitem')

      const nextLink = screen.getByRole('link', {
        name: /next/i,
      })
      expect(nextLink).toBeInTheDocument()
    })
  })
  describe('When user is on last page', () => {
    it("doesn't show link to next page", async () => {
      axios.get.mockResolvedValue({
        data: Array(15).fill({}),
      })

      const $route = createRoute({ page: '2' })
      renderJobListings($route)

      await screen.findAllByRole('listitem')

      const nextLink = screen.queryByRole(
        'link',
        {
          name: /next/i,
        }
      )
      expect(nextLink).not.toBeInTheDocument()
    })

    it('shows link to previous page', async () => {
      axios.get.mockResolvedValue({
        data: Array(15).fill({}),
      })

      const $route = createRoute({ page: '2' })
      renderJobListings($route)

      await screen.findAllByRole('listitem')

      const previousLink = screen.getByRole(
        'link',
        {
          name: /previous/i,
        }
      )
      expect(previousLink).toBeInTheDocument()
    })
  })
})
