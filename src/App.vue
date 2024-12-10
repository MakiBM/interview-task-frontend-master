<script setup lang="ts">
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import { Store, ActionTypes } from './store'
import PageNavbar from '@/components/PageNavbar.vue'

const store = useStore() as Store

onMounted(async () => {
  await store.dispatch(ActionTypes.FETCH_STOPS)
})
</script>

<template>
  <div class="bg-light-blue min-vh-100 font-inter">
    <div class="container">
      <div class="header">
        <h1 class="h4 semibold m-0">Timetable</h1>
      </div>

      <PageNavbar />

      <div
        v-if="store.state.isLoading"
        class="alert alert-primary"
        role="status"
      >
        Loading...
      </div>

      <div
        v-else-if="store.state.isError"
        class="alert alert-danger"
        role="alert"
      >
        Error while fetching data
      </div>

      <router-view v-else/>
    </div>
  </div>
</template>

<style>
/* 
  Quickfix for webpack issue:
  "The target environment doesn't support dynamic import() syntax so it's not possible to use external type 'module' within a script"
  Better fix would be to handle that via webpack configuration
*/
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
  margin: 0;
  min-height: 100vh;
}

/* Global classes */

.bg-light-blue {
  background-color: #F3F4F9;
}

.font-inter {
  font-family: 'Inter', sans-serif;
}

.semibold {
  font-weight: 500; /* 600 - in figma, visually it looks like 500 */
}

/* Boostrap overrides */

.text-primary {
  color: #1952E1 !important;
}

@media (min-width: 1400px) {
  .container, .container-lg, .container-md, .container-sm, .container-xl, .container-xxl {
    max-width: 1400px !important;
  }
}
</style>

<style scoped>
.header {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 24px;
  height: calc(40px + 40px + 24px);
}
</style>