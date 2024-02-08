<template>
  <collapsible-accordion header="Organizations">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li class="h-8 w-1/2">
            <input
              id="VueTube"
              type="checkbox"
              class="mr-3"
            />
            <label
              for="VueTube"
              class="cursor-pointer"
              >Vue tube</label
            >
          </li>
          <li class="h-8 w-1/2">
            <input
              id="Between Vue and Me"
              type="checkbox"
              class="mr-3"
            />
            <label
              for="Between Vue and Me"
              class="cursor-pointer"
              >Between vue</label
            >
          </li>
          <li class="h-8 w-1/2">
            <input
              id="Vue Brute"
              type="checkbox"
              class="mr-3"
            />
            <label
              for="Vue Brute"
              class="cursor-pointer"
              >Vue Brute</label
            >
          </li>
          <li class="h-8 w-1/2">
            <input
              id="Vue and a Half men"
              type="checkbox"
              class="mr-3"
            />
            <label
              for="Vue and a Half men"
              class="cursor-pointer"
              >Vue and a half men</label
            >
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>

<script>
import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue'

export default {
  name: 'JobFiltersSidebarOrganizations',
  components: {
    CollapsibleAccordion,
  },
}
</script>
