<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineProps<{
  items: string[]
  selected?: string | null
}>()

const emit = defineEmits<{
  (event: 'select', item: string): void
}>()
</script>

<template>
  <div class="card border-0 h-100">
    <div class="card-header">
      <div class="p-3 px-2">
        <!-- Card header -->
        <slot></slot>
      </div>
    </div>

    <div class="card-body">
      <ul class="list-group list-group-flush">
        <li
          v-for="item in items" 
          :key="item"
          class="list-group-item list-group-item-action py-3"
          :class="{ 'text-primary fw-medium': item === selected }"
          :role="selected !== undefined ? `button` : ``"
          @click="emit('select', item)"
        >
          <p class="px-2 mb-0">
            <small>{{ item }}</small>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.card-header {
  background: transparent;
  border-bottom-color: #E2E4EA;
}

.card-body {
  overflow-y: auto;
  padding: 0;
  font-size: 12px;
}

.list-group-item {
  border-color: #F3F4F9;
}
</style>