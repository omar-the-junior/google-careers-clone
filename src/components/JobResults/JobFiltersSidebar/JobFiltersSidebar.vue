<script setup lang="ts">
import ActionButton from '@/components/Shared/ActionButton.vue'
import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue'
import JobFiltersSidebarCheckboxGroup from './JobFiltersSidebarCheckboxGroup.vue'
import { useJobsStore } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'
import { computed } from 'vue'
import { useDegreesStore } from '@/stores/degrees'

const jobsStore = useJobsStore()
const userStore = useUserStore()
const degreesStore = useDegreesStore()

const uniqueJobTypes = computed(() => jobsStore.uniqueJobTypes)
const uniqueOrganizations = computed(
  () => jobsStore.uniqueOrganizations
)
const uniqueDegrees = computed(() => degreesStore.uniqueDegrees)
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
          <action-button text="Clear Filters" type="secondary" />
        </div>
      </div>
      <job-filters-sidebar-checkbox-group
        header="Degree"
        :unique-values="uniqueDegrees"
        :action="userStore.addSelectedDegrees"
      />
      <job-filters-sidebar-checkbox-group
        header="Job Types"
        :unique-values="uniqueJobTypes"
        :action="userStore.addSelectedJobTypes"
      />
      <job-filters-sidebar-checkbox-group
        header="Organizations"
        :unique-values="uniqueOrganizations"
        :action="userStore.addSelectedOrganization"
      />
    </section>
  </div>
</template>
