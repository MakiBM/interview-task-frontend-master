// Pattern resources
// https://dev.to/3vilarthas/vuex-typescript-m4j
// https://www.youtube.com/watch?v=fh0VboqAc8k&t=886s&ab_channel=ProgramWithErik

import { createStore, GetterTree, MutationTree, ActionContext, ActionTree, Store as VuexStore, CommitOptions, DispatchOptions } from 'vuex'


export interface Stop {
  line: number
  stop: string
  order: number
  time: string
}

export enum SortOrder {
  ASC = 1,
  DESC = -1
}

// STATE

export interface State {
  stops: Stop[]
  isLoading: boolean
  isError: boolean
  selectedLine: number | null
  selectedStation: string | null
  orderSorting: SortOrder
  nameSorting: SortOrder
  searchQuery: string | null
}

export const state: State = {
  stops: [],
  isLoading: false,
  isError: false,
  selectedLine: null,
  selectedStation: null,
  orderSorting: SortOrder.ASC,
  nameSorting: SortOrder.ASC,
  searchQuery: null
}

// GETTERS

export type RootGetters = {
  getLines: number[]
  getStopNames: string[]
  getStopNamesBySearchQuery: string[]
  getStopNamesByLine: string[]
  getTimesByLineAndStation: string[]
}

export type Getters = {
  getLines: (state: State) => number[]
  getStopNames: (state: State) => string[]
  getStopNamesBySearchQuery: (state: State, getters: RootGetters) => string[]
  getStopNamesByLine: (state: State) => string[]
  getTimesByLineAndStation: (state: State) => string[]
}

export const getters: GetterTree<State, State> & Getters = {
  getLines: (state: State): number[] => [...new Set(
    state.stops
    .map(stop => stop.line)
    .sort((a, b) => a - b)
  )],
  getStopNames: (state: State): string[] => [...new Set(
    state.stops
    .map(stop => stop.stop)
    .sort((a, b) => a.localeCompare(b) * state.nameSorting)
  )],
  getStopNamesBySearchQuery: (state: State, getters: RootGetters): string[] => {
    const stops = getters.getStopNames
    if (!state.searchQuery) return stops
    const query = state.searchQuery.toLowerCase()
    return stops.filter((stop: string) => stop.toLowerCase().includes(query))
  },
  getStopNamesByLine: (state: State): string[] => [...new Set(
    state.stops
    .filter(stop => stop.line === state.selectedLine)
    .sort((a, b) => (a.order - b.order) * state.orderSorting)
    .map(stop => stop.stop)
  )],
  getTimesByLineAndStation: (state: State): string[] => [...new Set(
    state.stops
    .filter(stop => stop.line === state.selectedLine && stop.stop === state.selectedStation)
    .map(stop => stop.time)
    .sort((a: string, b: string) => {
      const [hourA, minuteA] = a.split(':')
      const [hourB, minuteB] = b.split(':')
      return (Number(hourA) * 60 + Number(minuteA)) - (Number(hourB) * 60 + Number(minuteB))
    })
  )],
}

// MUTATIONS 

export enum MutationTypes {
  SET_STOPS = 'SET_STOPS',
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
  SET_SELECTED_LINE = 'SET_SELECTED_LINE',
  SET_SELECTED_STATION = 'SET_SELECTED_STATION',
  SET_ORDER_SORTING = 'SET_ORDER_SORTING',
  TOGGLE_ORDER_SORTING = 'TOGGLE_ORDER_SORTING',
  SET_NAME_SORTING = 'SET_NAME_SORTING',
  TOGGLE_NAME_SORTING = 'TOGGLE_NAME_SORTING',
  SET_SEARCH_QUERY = 'SET_SEARCH_QUERY',
}

export type Mutations<S = State> = {
  [MutationTypes.SET_STOPS](state: S, stops: Stop[]): void
  [MutationTypes.SET_LOADING](state: S, isLoading: boolean): void
  [MutationTypes.SET_ERROR](state: S, isError: boolean): void
  [MutationTypes.SET_SELECTED_LINE](state: S, line: number | null): void
  [MutationTypes.SET_SELECTED_STATION](state: S, station: string | null): void
  [MutationTypes.SET_ORDER_SORTING](state: S, order: SortOrder): void
  [MutationTypes.TOGGLE_ORDER_SORTING](state: S): void
  [MutationTypes.SET_NAME_SORTING](state: S, order: SortOrder): void
  [MutationTypes.TOGGLE_NAME_SORTING](state: S): void
  [MutationTypes.SET_SEARCH_QUERY](state: S, query: string): void
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_STOPS](state: State, stops: Stop[]) {
    state.stops = stops
  },
  [MutationTypes.SET_LOADING](state: State, isLoading: boolean) {
    state.isLoading = isLoading
  },
  [MutationTypes.SET_ERROR](state: State, isError: boolean) {
    state.isError = isError
  },
  [MutationTypes.SET_SELECTED_LINE](state: State, line: number | null) {
    state.selectedLine = line
    state.selectedStation = null // Reset station when line changes
  },
  [MutationTypes.SET_SELECTED_STATION](state: State, station: string | null) {
    state.selectedStation = station
  },
  [MutationTypes.SET_ORDER_SORTING](state: State, order: SortOrder) {
    state.orderSorting = order
  },
  [MutationTypes.TOGGLE_ORDER_SORTING](state: State) {
    state.orderSorting *= -1
  },
  [MutationTypes.SET_NAME_SORTING](state: State, order: SortOrder) {
    state.nameSorting = order
  },
  [MutationTypes.TOGGLE_NAME_SORTING](state: State) {
    state.nameSorting *= -1
  },
  [MutationTypes.SET_SEARCH_QUERY](state: State, query: string) {
    state.searchQuery = query
  }
}

// ACTIONS

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, State>, 'commit'>

export enum ActionTypes {
  FETCH_STOPS = 'FETCH_STOPS'
}

export interface Actions {
  [ActionTypes.FETCH_STOPS](context: AugmentedActionContext): Promise<Stop[] | undefined>
}

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.FETCH_STOPS]({ commit }: AugmentedActionContext) {
    try {
      commit(MutationTypes.SET_LOADING, true)
      commit(MutationTypes.SET_ERROR, false)
      const response = await fetch('http://localhost:3000/stops')
      const data: Stop[] = await response.json()
      commit(MutationTypes.SET_STOPS, data)
      commit(MutationTypes.SET_LOADING, false)
      // throw new Error('Error fetching stops') // For testing
      return data
    } catch (error) {
      console.error('Error fetching stops:', error)
      commit(MutationTypes.SET_LOADING, false)
      commit(MutationTypes.SET_ERROR, true)
    }
  }
}

// Store

export type Store = Omit<
  VuexStore<State>,
  'commit' | 'getters' | 'dispatch'
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  }
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>
}

export const store = createStore<State>({
  state,
  getters,
  mutations,
  actions
})

export default store as Store
