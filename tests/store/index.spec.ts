import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createStore } from 'vuex'
import { state, getters, mutations, actions, Store, State, Stop, SortOrder, MutationTypes, ActionTypes } from '../../src/store/index.js'

describe('Vuex Store', () => {
  let testStore: Store

  beforeEach(() => {
    // Reset the store before each test
    testStore = createStore<State>({
      state: state,
      getters: getters,
      mutations: mutations,
      actions: actions
    })
  })

  // Mutations Tests
  describe('Mutations', () => {
    const sampleStops: Stop[] = [
      { line: 1, stop: 'Station A', order: 1, time: '10:00' },
      { line: 1, stop: 'Station B', order: 2, time: '10:15' },
      { line: 2, stop: 'Station C', order: 1, time: '11:00' }
    ]

    it('SET_STOPS mutation sets stops correctly', () => {
      testStore.commit(MutationTypes.SET_STOPS, sampleStops)
      expect(testStore.state.stops).toEqual(sampleStops)
    })

    it('SET_LOADING mutation sets loading state', () => {
      testStore.commit(MutationTypes.SET_LOADING, true)
      expect(testStore.state.isLoading).toBe(true)
    })

    it('SET_ERROR mutation sets error state', () => {
      testStore.commit(MutationTypes.SET_ERROR, true)
      expect(testStore.state.isError).toBe(true)
    })

    it('SET_SELECTED_LINE mutation sets selected line and resets station', () => {
      testStore.commit(MutationTypes.SET_SELECTED_LINE, 1)
      expect(testStore.state.selectedLine).toBe(1)
      expect(testStore.state.selectedStation).toBeNull()
    })

    it('SET_SELECTED_STATION mutation sets selected station', () => {
      testStore.commit(MutationTypes.SET_SELECTED_STATION, 'Station A')
      expect(testStore.state.selectedStation).toBe('Station A')
    })

    it('TOGGLE_ORDER_SORTING mutation toggles order sorting', () => {
      testStore.commit(MutationTypes.TOGGLE_ORDER_SORTING)
      expect(testStore.state.orderSorting).toBe(SortOrder.DESC)
      testStore.commit(MutationTypes.TOGGLE_ORDER_SORTING)
      expect(testStore.state.orderSorting).toBe(SortOrder.ASC)
    })

    it('TOGGLE_NAME_SORTING mutation toggles name sorting', () => {
      testStore.commit(MutationTypes.TOGGLE_NAME_SORTING)
      expect(testStore.state.nameSorting).toBe(SortOrder.DESC)
      testStore.commit(MutationTypes.TOGGLE_NAME_SORTING)
      expect(testStore.state.nameSorting).toBe(SortOrder.ASC)
    })

    it('SET_SEARCH_QUERY mutation sets search query', () => {
      testStore.commit(MutationTypes.SET_SEARCH_QUERY, 'search query')
      expect(testStore.state.searchQuery).toBe('search query')
    })
  })

  // Getters Tests
  describe('Getters', () => {
    const sampleStops: Stop[] = [
      { line: 1, stop: 'Station B', order: 2, time: '10:15' },
      { line: 1, stop: 'Station A', order: 1, time: '10:00' },
      { line: 2, stop: 'Station C', order: 1, time: '11:00' },
      { line: 2, stop: 'Station D', order: 2, time: '11:15' }
    ]

    beforeEach(() => {
      testStore.commit(MutationTypes.SET_STOPS, sampleStops)
    })

    it('getLines getter returns unique sorted lines', () => {
      const lines = testStore.getters.getLines
      expect(lines).toEqual([1, 2])
    })

    it('getStopNames getter returns unique sorted ASC station names', () => {
      testStore.commit(MutationTypes.SET_NAME_SORTING, SortOrder.ASC)
      const stopNames = testStore.getters.getStopNames
      expect(stopNames).toEqual(['Station A', 'Station B', 'Station C', 'Station D'])
    })

    it('getStopNames getter returns unique sorted DESC station names', () => {
      testStore.commit(MutationTypes.SET_NAME_SORTING, SortOrder.DESC)
      const stopNames = testStore.getters.getStopNames
      expect(stopNames).toEqual(['Station D', 'Station C', 'Station B', 'Station A'])
    })

    it('getStopNamesBySearchQuery getter returns sorted (name ASC) station names for search query', () => {
      testStore.commit(MutationTypes.SET_SEARCH_QUERY, 'station a')
      const stopNames = testStore.getters.getStopNamesBySearchQuery
      expect(stopNames).toEqual(['Station A'])
    })

    it('getStopNamesByLine getter returns sorted (order ASC) station names for selected line', () => {
      testStore.commit(MutationTypes.SET_SELECTED_LINE, 1)
      testStore.commit(MutationTypes.SET_ORDER_SORTING, SortOrder.ASC)
      const stopNames = testStore.getters.getStopNamesByLine
      expect(stopNames).toEqual(['Station A', 'Station B'])
    })

    it('getStopNamesByLine getter returns sorted (order DESC) station names for selected line', () => {
      testStore.commit(MutationTypes.SET_SELECTED_LINE, 1)
      testStore.commit(MutationTypes.SET_ORDER_SORTING, SortOrder.DESC)
      const stopNames = testStore.getters.getStopNamesByLine
      expect(stopNames).toEqual(['Station B', 'Station A'])
    })

    it('getTimesByLineAndStation getter returns sorted ASC times', () => {
      testStore.commit(MutationTypes.SET_SELECTED_LINE, 2)
      testStore.commit(MutationTypes.SET_SELECTED_STATION, 'Station C')
      const times = testStore.getters.getTimesByLineAndStation
      expect(times).toEqual(['11:00'])
    })
  })

  // Actions Tests
  describe('Actions', () => {
    it('FETCH_STOPS action successfully fetches stops', async () => {
      // Mock fetch
      const mockStops: Stop[] = [
        { line: 1, stop: 'Station A', order: 1, time: '10:00' },
        { line: 2, stop: 'Station B', order: 2, time: '11:00' }
      ]
      
      global.fetch = vi.fn(() => 
        Promise.resolve({
          json: () => Promise.resolve(mockStops)
        }) as any
      )

      const commit = vi.fn()
      const context = { commit }
      
      await actions[ActionTypes.FETCH_STOPS](context as any)

      // Verify commits
      expect(commit).toHaveBeenCalledWith(MutationTypes.SET_LOADING, true)
      expect(commit).toHaveBeenCalledWith(MutationTypes.SET_ERROR, false)
      expect(commit).toHaveBeenCalledWith(MutationTypes.SET_STOPS, mockStops)
      expect(commit).toHaveBeenCalledWith(MutationTypes.SET_LOADING, false)
    })

    it('FETCH_STOPS action handles errors', async () => {
      // Mock fetch to throw an error
      global.fetch = vi.fn(() => 
        Promise.reject(new Error('Network error'))
      )

      const commit = vi.fn()
      const context = { commit }
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      
      await actions[ActionTypes.FETCH_STOPS](context as any)

      // Verify commits and error handling
      expect(commit).toHaveBeenCalledWith(MutationTypes.SET_LOADING, true)
      expect(commit).toHaveBeenCalledWith(MutationTypes.SET_ERROR, false)
      expect(commit).toHaveBeenCalledWith(MutationTypes.SET_LOADING, false)
      expect(commit).toHaveBeenCalledWith(MutationTypes.SET_ERROR, true)
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching stops:', expect.any(Error))

      consoleErrorSpy.mockRestore()
    })
  })
})