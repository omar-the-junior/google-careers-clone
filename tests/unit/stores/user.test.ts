import { useUserStore } from '@/stores/user'
import { createPinia, setActivePinia } from 'pinia'

beforeEach(() => {
  setActivePinia(createPinia())
})

describe('state', () => {
  it('keeps track of if user is logged in', () => {
    const store = useUserStore()
    expect(store.isLoggedIn).toBe(false)
  })

  it('stores organizations that the user would like to filter jobs by', () => {
    const store = useUserStore()
    expect(store.selectedOrganizations).toEqual([])
  })

  it('stores job types that the user would like to filter the jobs by', () => {
    const store = useUserStore()
    expect(store.selectedJobTypes).toEqual([])
  })
  it('stores degrees that the user would like to filter jobs by', () => {
    const store = useUserStore()
    expect(store.selectedDegrees).toEqual([])
  })
  it("stores user's search term for skills and qualifications", () => {
    const store = useUserStore()
    expect(store.skillsSearchTerm).toBe('')
  })
})

describe('actions', () => {
  describe('loginUser', () => {
    it('logs the user in', () => {
      const store = useUserStore()
      store.login()
      expect(store.isLoggedIn).toBe(true)
    })
  })

  describe('addSelectedOrganization', () => {
    it('updates organizations the user has chosen to filter jobs by', () => {
      const store = useUserStore()

      store.addSelectedOrganization([
        'Organization 1',
        'Organization 2',
      ])

      expect(store.selectedOrganizations).toEqual([
        'Organization 1',
        'Organization 2',
      ])
    })
  })

  describe('addSelectedJobType', () => {
    it('updates job types the user has chosen to filter jobs by', () => {
      const store = useUserStore()
      store.addSelectedJobTypes(['Full Time', 'Part Time'])
      expect(store.selectedJobTypes).toEqual([
        'Full Time',
        'Part Time',
      ])
    })
  })

  describe('addSelectedDegrees', () => {
    it('updates degrees the user has chosen to filter jobs by', () => {
      const store = useUserStore()
      store.addSelectedDegrees(["Bachelor's", "Master's"])
      expect(store.selectedDegrees).toEqual([
        "Bachelor's",
        "Master's",
      ])
    })
  })

  describe('updateSkillsSearchTerm', () => {
    it('recieves search term for skills the user has entered', () => {
      const store = useUserStore()
      store.skillsSearchTerm = ''
      store.updateSkillsSearchTerm('vue')
      expect(store.skillsSearchTerm).toBe('vue')
    })
  })

  describe('clearUserJobFilterSelections', () => {
    it('removes all job filters that user has chosen', () => {
      const store = useUserStore()
      store.selectedDegrees = ['Random degree']
      store.selectedJobTypes = ['Random job type']
      store.selectedOrganizations = ['Random organization']
      store.skillsSearchTerm = 'Random skills'

      store.clearUserJobFilterSelections()
      expect(store.selectedDegrees).toEqual([])
      expect(store.selectedJobTypes).toEqual([])
      expect(store.selectedOrganizations).toEqual([])
      expect(store.skillsSearchTerm).toBe('')
    })
  })
})
