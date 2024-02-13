<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const props = defineProps({
  uniqueValues: {
    type: Set<string>,
    required: true,
  },
  selectedItems: {
    type: Array<string>,
    required: true,
  },
  action: {
    type: Function,
    required: true,
  },
})

const selectedValues = computed<string[]>({
  get() {
    return props.selectedItems
  },
  set(newValue) {
    props.action(newValue)
  },
})
const router = useRouter()

const selectValue = () => {
  props.action(selectedValues.value)

  router.push({
    name: 'JobResults',
  })
}
</script>

<template>
  <div class="mt-5">
    <fieldset>
      <ul class="flex flex-row flex-wrap">
        <li
          v-for="value in uniqueValues"
          :key="value"
          class="h-8 w-1/2"
        >
          <input
            :id="value"
            v-model="selectedValues"
            :value="value"
            type="checkbox"
            class="mr-3"
            @change="selectValue"
          />
          <label :for="value" class="cursor-pointer">{{
            value
          }}</label>
        </li>
      </ul>
    </fieldset>
  </div>
</template>
