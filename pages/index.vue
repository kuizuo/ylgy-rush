<script setup>

</script>

<template>
  <div>
    <Logos mb-6 />
    <Suspense>
      <Yang />
      <template #fallback>
        <div op50 italic>
          <span animate-pulse>Loading...</span>
        </div>
      </template>
    </Suspense>
  </div>
</template>
