<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const spotlights = ref([])

onMounted(async () => {
  const response = await axios.get(
    'http://localhost:3000/spotlights'
  )
  spotlights.value = response.data
})
</script>

<template>
  <ul>
    <li
      v-for="spotlight in spotlights"
      :key="spotlight.id"
    >
      <slot
        :img="spotlight.img"
        :title="spotlight.title"
        :description="spotlight.description"
      ></slot>
    </li>
  </ul>
</template>
