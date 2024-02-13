import { defineStore } from 'pinia'

export interface UserState {
  isLoggedIn: boolean
  selectedOrganizations: string[]
  selectedJobTypes: string[]
  selectedDegrees: string[]
}
export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    isLoggedIn: false,
    selectedOrganizations: [],
    selectedJobTypes: [],
    selectedDegrees: [],
  }),
  actions: {
    login() {
      this.isLoggedIn = true
    },
    addSelectedOrganization(organizations: string[]) {
      this.selectedOrganizations = organizations
    },
    addSelectedJobTypes(jobTypes: string[]) {
      this.selectedJobTypes = jobTypes
    },
    addSelectedDegrees(degrees: string[]) {
      this.selectedDegrees = degrees
    },
  },
})
