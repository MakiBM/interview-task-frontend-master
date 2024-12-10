<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  title: string
}>()
</script>

<template>
  <div class="card h-100 dashed">
    <div class="card-body d-flex align-items-center justify-content-center text-muted">
      {{ title }}
    </div>
  </div>
</template>

<style scoped>
.dashed {
  border: 2px dashed lightgray;
}

.card-body {
  font-size: 14px;
}
</style>