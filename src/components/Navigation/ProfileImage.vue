<script setup lang="ts">
import { ref } from 'vue'

const imageLink = ref('/images/profile-pic.png')
</script>

<template>
  <img
    :src="imageLink"
    alt="User profile image"
    class="h-8 w-8 rounded-3xl object-contain"
  />
</template>
