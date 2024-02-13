<script setup lang="ts">
import { computed, onMounted } from 'vue'

import ActionButton from '@/components/Shared/ActionButton.vue'
import JobFiltersSidebarCheckboxGroup from './JobFiltersSidebarCheckboxGroup.vue'
import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue'
import JobFiltersSidebarSkills from './JobFiltersSidebarSkills.vue'

import { useJobsStore } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'
import { useDegreesStore } from '@/stores/degrees'
import { useRoute } from 'vue-router'

const jobsStore = useJobsStore()
const userStore = useUserStore()
const degreesStore = useDegreesStore()

const uniqueJobTypes = computed(() => jobsStore.uniqueJobTypes)
const uniqueOrganizations = computed(
  () => jobsStore.uniqueOrganizations
)
const uniqueDegrees = computed(() => degreesStore.uniqueDegrees)

const route = useRoute()

onMounted(() => {
  const role = (route.query.role as string) || ''
  userStore.updateSkillsSearchTerm(role)
})
</script>

<template>
  <div
    class="flex w-96 flex-col border-r border-solid border-brand-gray-1 bg-white p-4"
  >
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">
          What do you want to do?
        </h3>
        <div class="flex items-center text-sm">
          <action-button
            text="Clear Filters"
            type="secondary"
            @click="userStore.clearUserJobFilterSelections"
          />
        </div>
      </div>

      <job-filters-sidebar-skills />
      <collapsible-accordion header="Degree">
        <job-filters-sidebar-checkbox-group
          :selected-items="userStore.selectedDegrees"
          :unique-values="uniqueDegrees"
          :action="userStore.addSelectedDegrees"
        />
      </collapsible-accordion>

      <collapsible-accordion header="Job types">
        <job-filters-sidebar-checkbox-group
          :selected-items="userStore.selectedJobTypes"
          :unique-values="uniqueJobTypes"
          :action="userStore.addSelectedJobTypes"
        />
      </collapsible-accordion>

      <collapsible-accordion header="Organizations">
        <job-filters-sidebar-checkbox-group
          :selected-items="userStore.selectedOrganizations"
          :unique-values="uniqueOrganizations"
          :action="userStore.addSelectedOrganization"
        />
      </collapsible-accordion>
    </section>
  </div>
</template>
