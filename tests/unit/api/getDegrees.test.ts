import type { Mock } from 'vitest'
import axios from 'axios'
import getDegrees from '@/api/getDegrees'

vi.mock('axios')
const axiosGetMock = axios.get as Mock

describe('getDegrees', () => {
  beforeEach(() => {
    axiosGetMock.mockResolvedValue({
      data: [
        { id: 1, degree: "Master's" },
        { id: 2, degree: "Bachelor's" },
      ],
    })
  })

  it('fetches jobs that candidates can apply to', async () => {
    await getDegrees()
    expect(axios.get).toHaveBeenCalledWith(
      `${import.meta.env.VITE_APP_API_URL}/degrees`
    )
  })

  it('extracts jobs from response', async () => {
    const data = await getDegrees()

    expect(data).toEqual([
      { id: 1, degree: "Master's" },
      { id: 2, degree: "Bachelor's" },
    ])
  })
})
