import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    selectedOrganizations: [],
    selectedJobTypes: [],
  }),
  actions: {
    login() {
      this.isLoggedIn = true
    },
    addSelectedOrganization(organizations) {
      this.selectedOrganizations = organizations
    },
    addSelectedJobTypes(jobTypes) {
      this.selectedJobTypes = jobTypes
    },
  },
})
