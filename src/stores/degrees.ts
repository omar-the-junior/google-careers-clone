import getDegrees from '@/api/getDegrees'
import type { Degree } from '@/api/types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useDegreesStore = defineStore('degrees', () => {
  const degrees = ref<Degree[]>([])

  const fetchDegrees = async () => {
    const receivedDegrees = await getDegrees()
    degrees.value = receivedDegrees
  }

  const uniqueDegrees = computed(
    () => new Set(degrees.value.map((degree) => degree.degree))
  )
  return { degrees, fetchDegrees, uniqueDegrees }
})
