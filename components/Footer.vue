<script setup lang="ts">
import pkg from '~/package.json'
</script>

<template>
  <div
    text="xl gray4"
    m-5
    flex
    justify-center
    gap-3
  >
    <a i-carbon-logo-github :href="pkg.repository.url" target="_blank" />
    <DarkToggle />
  </div>
</template>
