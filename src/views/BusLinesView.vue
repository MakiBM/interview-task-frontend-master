<script setup lang="ts">
import { useStore } from 'vuex'
import { Store, SortOrder, MutationTypes } from '@/store'
import LineSelector from '@/components/LineSelector.vue'
import ListCard from '@/components/ListCard.vue'
import ListCardPlaceholder from '@/components/ListCardPlaceholder.vue'
import SortingArrow from '@/components/SortingArrow.vue'

const store = useStore() as Store
</script>

<template>
  <section class="bus-lines">
    <LineSelector class="bus-lines__selector" />

    <div class="bus-lines__stations scrollable">
      <ListCardPlaceholder
        v-if="!store.state.selectedLine"
        title="Please select the bus line first"
      />
      <ListCard 
        v-else
        :items="store.getters.getStopNamesByLine"
        :selected="store.state.selectedStation"
        @select="(station: string) => store.commit(MutationTypes.SET_SELECTED_STATION, station)"
      >
        <div class="title mb-4 semibold">
          Bus Line: {{ store.state.selectedLine }}
        </div>
        <div class="subtitle semibold pt-2">
          <span>Bus Stops</span>&nbsp;

          <span role="button" @click="store.commit(MutationTypes.TOGGLE_ORDER_SORTING)">
            <SortingArrow :isDown="store.state.orderSorting === SortOrder.ASC"/>
          </span>
        </div>
      </ListCard>
    </div>
    
    <div class="bus-lines__times scrollable">
      <ListCardPlaceholder
        v-if="!(store.state.selectedLine && store.state.selectedStation)"
        :title="store.state.selectedLine ? 'Please select the bus stop first' : 'Please select the bus line first'"
      />
      <ListCard 
        v-else
        :items="store.getters.getTimesByLineAndStation"
      >
        <div class="title mb-4 semibold">
          {{ `Bus Stop: ${store.state.selectedStation}` }}
        </div>
        <div class="subtitle semibold pt-2">
          Time
        </div>
      </ListCard>
    </div>
  </section>
</template>

<style scoped>
.bus-lines {
  height: calc(100vh - 224px);
  display: grid;
  grid-template-rows: 1fr 100fr;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  grid-template-areas:
    "a a"
    "b c";
}

.bus-lines__selector { grid-area: a; }
.bus-lines__stations { grid-area: b; }
.bus-lines__times { grid-area: c; }

.scrollable {
  overflow-y: auto;
}

.title {
  font-size: 14px;
}

.subtitle {
  font-size: 12px;
}
</style>