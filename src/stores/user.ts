import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const isLoggedIn = ref<boolean>(false)
  const selectedOrganizations = ref<string[]>([])
  const selectedJobTypes = ref<string[]>([])
  const selectedDegrees = ref<string[]>([])
  const skillsSearchTerm = ref<string>('')

  const login = () => {
    isLoggedIn.value = true
  }

  const addSelectedOrganization = (organizations: string[]) => {
    selectedOrganizations.value = organizations
  }
  const addSelectedJobTypes = (jobTypes: string[]) => {
    selectedJobTypes.value = jobTypes
  }
  const addSelectedDegrees = (degrees: string[]) => {
    selectedDegrees.value = degrees
  }
  const clearUserJobFilterSelections = () => {
    selectedDegrees.value = []
    selectedJobTypes.value = []
    selectedOrganizations.value = []
    skillsSearchTerm.value = ''
  }
  const updateSkillsSearchTerm = (term: string) => {
    skillsSearchTerm.value = term
  }

  return {
    isLoggedIn,
    selectedDegrees,
    selectedJobTypes,
    selectedOrganizations,
    skillsSearchTerm,
    login,
    addSelectedOrganization,
    addSelectedJobTypes,
    addSelectedDegrees,
    updateSkillsSearchTerm,
    clearUserJobFilterSelections,
  }
})
