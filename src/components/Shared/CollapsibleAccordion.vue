<script setup lang="ts">
import { computed, ref } from 'vue'
defineProps({
  header: {
    type: String,
    required: true,
  },
})

const isOpen = ref(false)

const toggleAccordion = () => {
  isOpen.value = !isOpen.value
}

const caretIcon = computed(() =>
  isOpen.value ? ['fas', 'angle-up'] : ['fas', 'angle-down']
)
</script>

<template>
  <div class="border-b border-solid border-brand-gray-2 py-5">
    <div
      class="flex cursor-pointer flex-wrap items-center justify-between"
      role="button"
      @click="toggleAccordion"
    >
      <h3 class="text-base font-semibold">
        {{ header }}
      </h3>

      <font-awesome-icon :icon="caretIcon" />
    </div>

    <div v-if="isOpen" class="mt-5 w-full">
      <slot>No content provided</slot>
    </div>
  </div>
</template>
