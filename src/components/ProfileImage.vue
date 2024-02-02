<template>
  <img
    :src="imageLink"
    alt="User profile image"
    class="h-8 w-8 rounded-3xl object-contain"
  />
</template>

<script>
export default {
  name: 'ProfileImage',
  data() {
    return {
      imageLink: '/images/profile-pic.png',
    }
  },
}
</script>
