<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'

interface Spotlight {
  id: number
  img: string
  title: string
  description: string
}

const spotlights = ref<Spotlight[]>([])

onMounted(async () => {
  const response = await axios.get<Spotlight[]>(
    'http://localhost:3000/spotlights'
  )
  spotlights.value = response.data
})
</script>

<template>
  <ul>
    <li v-for="spotlight in spotlights" :key="spotlight.id">
      <slot
        :img="spotlight.img"
        :title="spotlight.title"
        :description="spotlight.description"
      ></slot>
    </li>
  </ul>
</template>
