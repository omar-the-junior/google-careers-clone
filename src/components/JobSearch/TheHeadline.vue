<script setup lang="ts">
import nextElementInList from '@/utils/nextElementInList'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
const action = ref('Build')
const interval = ref<ReturnType<typeof setInterval>>()

const actionClasses = computed(() => ({
  [action.value.toLowerCase()]: true,
}))

onMounted(() => {
  interval.value = setInterval(() => {
    const actions = ['Build', 'Create', 'Design', 'Code']
    action.value = nextElementInList(actions, action.value)
  }, 3000)
})

onBeforeUnmount(() => clearInterval(interval.value))
</script>

<template>
  <section class="mb-16">
    <h1 class="mb-14 text-8xl font-bold">
      <div class="relative h-28 w-full overflow-hidden">
        <Transition name="slide-up">
          <span
            v-if="action === 'Build'"
            :class="[actionClasses, 'absolute']"
            >Build</span
          >
          <span
            v-else-if="action === 'Create'"
            :class="[actionClasses, 'absolute']"
            >Create</span
          >
          <span
            v-else-if="action === 'Design'"
            :class="[actionClasses, 'absolute']"
            >Design</span
          >
          <span
            v-else-if="action === 'Code'"
            :class="[actionClasses, 'absolute']"
            >Code</span
          >
        </Transition>
      </div>
      for everyone
    </h1>
    <h2 class="text-3xl font-light">Find your next job at Google.</h2>
  </section>
</template>

<style scoped>
.build {
  color: #1a73e8;
}

.create {
  color: #34a853;
}

.design {
  color: #f9ab00;
}

.code {
  color: #d93025;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  transform: translateY(100%);
}

.slide-up-leave-to {
  transform: translateY(-100%);
}
</style>
