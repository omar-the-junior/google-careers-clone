import type { Mock } from 'vitest'
import axios from 'axios'
import getJobs from '@/api/getJobs'

vi.mock('axios')
const axiosGetMock = axios.get as Mock

describe('getJobs', () => {
  beforeEach(() => {
    axiosGetMock.mockResolvedValue({
      data: [
        { id: 1, title: 'Frontend Developer' },
        { id: 2, title: 'Backend Developer' },
      ],
    })
  })

  it('fetches jobs that candidates can apply to', async () => {
    await getJobs()
    expect(axios.get).toHaveBeenCalledWith(
      `${import.meta.env.VITE_APP_API_URL}/jobs`
    )
  })

  it('extracts jobs from response', async () => {
    const data = await getJobs()

    expect(data).toEqual([
      { id: 1, title: 'Frontend Developer' },
      { id: 2, title: 'Backend Developer' },
    ])
  })
})
