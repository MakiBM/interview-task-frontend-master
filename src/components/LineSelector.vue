<script setup lang="ts">
import { useStore } from 'vuex'
import { Store, MutationTypes } from '@/store'

const store = useStore() as Store
</script>

<template>
  <div class="card border-0 p-2 front-inter">
    <div class="card-body">
      <p class="card-title mb-1 semibold">
        Select Bus Line
      </p>
      <div class="d-flex flex-wrap gap-2 pt-4">
        <button
          v-for="line in store.getters.getLines"
          :key="line"
          class="btn btn-primary"
          :style="store.state.selectedLine === line ? `background: #293F6C;` : ''"
          @click="store.commit(MutationTypes.SET_SELECTED_LINE, line)"
        >
          {{ line }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-title {
  font-size: 14px;
}

.btn {
  font-size: 12px;
  background-color: #1952E1;
}
</style>