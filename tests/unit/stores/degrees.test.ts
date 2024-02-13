import { createPinia, setActivePinia } from 'pinia'

import { useDegreesStore } from '@/stores/degrees'
import type { Mock } from 'vitest'
import axios from 'axios'
import { createDegree } from '../../utils/createDegree'

vi.mock('axios')

const axiosGetMock = axios.get as Mock
describe('state', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Stores all degrees that jobs may require', () => {
    const store = useDegreesStore()
    expect(store.degrees).toEqual([])
  })
})

describe('actions', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('fetchDegrees', () => {
    it('makes API requests and stores received degrees', async () => {
      axiosGetMock.mockResolvedValue({
        data: [createDegree({ id: 1, degree: "Bachelor's" })],
      })

      const store = useDegreesStore()
      await store.fetchDegrees()

      expect(store.degrees).toEqual([
        createDegree({ id: 1, degree: "Bachelor's" }),
      ])
    })
  })
})

describe('getters', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('uniqueDegrees', () => {
    it('finds unique degrees from collection of degrees', async () => {
      const store = useDegreesStore()

      store.degrees = [
        createDegree({ id: 1, degree: "Bachelor's" }),
        createDegree({ id: 2, degree: "Bachelor's" }),
        createDegree({ id: 3, degree: "Master's" }),
        createDegree({ id: 4, degree: "Master's" }),
      ]

      expect(store.uniqueDegrees).toEqual(
        new Set<String>(["Bachelor's", "Master's"])
      )
    })
  })
})
