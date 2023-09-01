<script lang="ts" setup>
defineProps<{ info: API.CinemaInfo | null }>();
</script>
<template>
  <h1>{{ info?.address }}</h1>
</template>
