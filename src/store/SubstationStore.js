import { getSubstations, getSubstation, deleteSubstation, createSubstation } from '@/api/backendInstance'
import { defineStore } from 'pinia'
import useNetworkStore from './NetworkStore'
import cloneDeep from 'lodash'

const useSubstationStore = defineStore('Substation', {
  state: () => ({
    substations: [],
    pageModes: {
      CREATE: 1,
      READ: 2,
      UPDATE: 3
    }
  }),
  actions: {
    async getSubstations () {
      this.substations = await getSubstations()
    },

    async getSubstation (id) {
      return await getSubstation(id)
    },

    async createSubstation (data) {
      const newSubstation = await createSubstation(data)
      this.substations.push(newSubstation)
    },

    async deleteSubstation (id) {
      // Need to delete all related networks together
      const networks = cloneDeep(useNetworkStore.networks)
      networks.forEach(async (network) => {
        await useNetworkStore.deleteNetwork(network.id)
      })

      useNetworkStore.networks = networks

      await deleteSubstation(id)
      this.substations = this.substations.filter((substation) => substation._id !== id)
    }
  }
})

export default useSubstationStore
