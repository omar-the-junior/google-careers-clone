<template>
  <collapsible-accordion header="Job Types">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li
            v-for="jobType in uniqueJobTypes"
            :key="jobType"
            class="h-8 w-1/2"
          >
            <input
              :id="jobType"
              v-model="selectedJobTypes"
              :value="jobType"
              type="checkbox"
              class="mr-3"
              @change="selectJobType"
            />
            <label
              :for="jobType"
              class="cursor-pointer"
              >{{ jobType }}</label
            >
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>

<script>
import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue'
import { mapState, mapActions } from 'pinia'

import { useJobsStore } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'

export default {
  name: 'JobFiltersSidebarJobTypes',
  components: {
    CollapsibleAccordion,
  },
  data() {
    return {
      selectedJobTypes: [],
    }
  },
  computed: {
    ...mapState(useJobsStore, ['uniqueJobTypes']),
  },
  methods: {
    ...mapActions(useUserStore, [
      'addSelectedJobTypes',
    ]),
    selectJobType() {
      this.addSelectedJobTypes(
        this.selectedJobTypes
      )
      this.$router.push({
        name: 'JobResults',
      })
    },
  },
}
</script>
