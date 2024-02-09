<template>
  <collapsible-accordion header="Organizations">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li
            v-for="organization in uniqueOrganizations"
            :key="organization"
            class="h-8 w-1/2"
          >
            <input
              :id="organization"
              v-model="selectedOrganizations"
              :value="organization"
              type="checkbox"
              class="mr-3"
              @change="selectOrganization"
            />
            <label
              :for="organization"
              class="cursor-pointer"
              >{{ organization }}</label
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
  name: 'JobFiltersSidebarOrganizations',
  components: {
    CollapsibleAccordion,
  },
  data() {
    return {
      selectedOrganizations: [],
    }
  },
  computed: {
    ...mapState(useJobsStore, [
      'uniqueOrganizations',
    ]),
  },
  methods: {
    ...mapActions(useUserStore, [
      'addSelectedOrganization',
    ]),
    selectOrganization() {
      this.addSelectedOrganization(
        this.selectedOrganizations
      )
    },
  },
}
</script>
