import { getSubstations, getSubstation, deleteSubstation, createSubstation, editSubstation } from '@/api/backendInstance'
import { defineStore } from 'pinia'
import useNetworkStore from './NetworkStore'
import cloneDeep from 'lodash'

const useSubstationStore = defineStore('Substation', {
  state: () => ({
    substations: [],
    selectedSubstation: {},
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
      const substation = await getSubstation(id)
      this.selectedSubstation = substation
      return substation
    },

    async createSubstation (data) {
      const newSubstation = await createSubstation(data)
      this.substations.push(newSubstation)
    },

    async editSubstation (id, data) {
      await editSubstation(id, data)
      this.substations.forEach((substation) => {
        if (substation._id === id) {
          if (data.code) substation.code = data.code
          if (data.name) substation.name = data.name
          if (data.latitude) substation.latitude = data.latitude
          if (data.longitude) substation.longitude = data.longitude
        }
      })
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
