import {
  render,
  screen,
} from '@testing-library/vue'

import JobListing from '@/components/JobResults/JobListing.vue'
import { RouterLinkStub } from '@vue/test-utils'

describe('JobListing', () => {
  const createJobProps = (jobProps = {}) => ({
    title: 'Vue Developer',
    organization: 'AirBnB',
    locations: ['Silicon Valley'],
    minimumQualifications: ['lorem ipsum'],
    ...jobProps,
  })

  const renderJobListing = (job) => {
    render(JobListing, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
      props: {
        job,
      },
    })
  }

  it('renders job title', () => {
    const job = createJobProps()
    renderJobListing(job)

    expect(
      screen.getByText(job.title)
    ).toBeInTheDocument()
  })

  it('renders job organization', () => {
    const job = createJobProps()
    renderJobListing(job)

    expect(
      screen.getByText(job.organization)
    ).toBeInTheDocument()
  })

  it('renders job locations', () => {
    const jobProps = createJobProps({
      locations: ['San Francisco', 'New York'],
    })

    renderJobListing(jobProps)

    expect(
      screen.getByText('San Francisco')
    ).toBeInTheDocument()
    expect(
      screen.getByText('New York')
    ).toBeInTheDocument()
  })

  it('renders job qualifications', () => {
    const jobProps = createJobProps({
      minimumQualifications: [
        'lorem ipsum dolor',
        'lorem ipsum dolor sit amet',
      ],
    })

    renderJobListing(jobProps)

    expect(
      screen.getByText(
        jobProps.minimumQualifications[0]
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        jobProps.minimumQualifications[1]
      )
    ).toBeInTheDocument()
  })
})
