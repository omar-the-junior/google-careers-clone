import { render, screen } from '@testing-library/vue'

import JobListing from '@/components/JobResults/JobListing.vue'
import { RouterLinkStub } from '@vue/test-utils'
import { createJob } from '../../../utils/createJob'
import type { Job } from '@/api/types'

describe('JobListing', () => {
  const renderJobListing = (job: Job) => {
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
    const job = createJob()
    renderJobListing(job)

    expect(screen.getByText(job.title)).toBeInTheDocument()
  })

  it('renders job organization', () => {
    const job = createJob()
    renderJobListing(job)

    expect(screen.getByText(job.organization)).toBeInTheDocument()
  })

  it('renders job locations', () => {
    const jobProps = createJob({
      locations: ['San Francisco', 'New York'],
    })

    renderJobListing(jobProps)

    expect(screen.getByText('San Francisco')).toBeInTheDocument()
    expect(screen.getByText('New York')).toBeInTheDocument()
  })

  it('renders job qualifications', () => {
    const jobProps = createJob({
      minimumQualifications: [
        'lorem ipsum dolor',
        'lorem ipsum dolor sit amet',
      ],
    })

    renderJobListing(jobProps)

    expect(
      screen.getByText(jobProps.minimumQualifications[0])
    ).toBeInTheDocument()
    expect(
      screen.getByText(jobProps.minimumQualifications[1])
    ).toBeInTheDocument()
  })
})
