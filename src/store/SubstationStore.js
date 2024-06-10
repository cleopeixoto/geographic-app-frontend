import { getSubstations } from '@/api/backendInstance'
import { defineStore } from 'pinia'

const useSubstationStore = defineStore('Substation', {
  state: () => ({
    substations: []
  }),
  actions: {
    async getSubstations () {
      this.substations = await getSubstations()
    }
  }
})

export default useSubstationStore
