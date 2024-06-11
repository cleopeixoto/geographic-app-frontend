import { getNetworks, deleteNetwork, createNetwork } from '@/api/backendInstance'
import { defineStore } from 'pinia'

const useNetworkStore = defineStore('Network', {
  state: () => ({
    networks: []
  }),
  actions: {
    async getRelatedNetworks (substationId) {
      if (!substationId) return
      const allNetworks = await getNetworks(substationId)

      this.networks = allNetworks.filter((network) => network.subStationId === substationId)
      return this.networks
    },

    async createNetwork (data) {
      const netNetwork = await createNetwork(data)
      this.networks.push(netNetwork)
    },

    async deleteNetwork (id) {
      if (!id) return
      await deleteNetwork(id)

      this.networks = this.networks.filter((network) => network._id !== id)
    }
  }
})

export default useNetworkStore
