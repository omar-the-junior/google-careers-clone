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
    <h1 class="mb-14 text-8xl font-bold tracking-tighter">
      <span :class="[actionClasses]">{{ action }}</span>
      <br />
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
</style>
