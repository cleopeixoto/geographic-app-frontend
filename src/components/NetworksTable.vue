<template>
  <div class="network-details-container">
    <div class="network-card generic-card card">
      <div class="form-title">
        <span>MT Network</span>
      </div>

      <div class="form" :class="{'disable-editing': currentMode === SubstationStore.pageModes.READ}">
        <div class="input-group">
          <span>Code:</span>
          <input class="input-field" v-model.trim="currentNetwork.code" maxlength="10">
          <span class="field-error" v-if="triggerSubmit && !currentNetwork.code">Code is required</span>
        </div>

        <div class="input-group">
          <span>Name:</span>
          <input class="input-field" v-model.trim="currentNetwork.name" maxlength="100">
          <span class="field-error" v-if="triggerSubmit && !currentNetwork.name">Name is required</span>
        </div>
      </div>

      <div class="form-footer">
        <div class="buttons">
          <button type="submit" class="btn primary-btn"
            :disabled="hasCustomErrors"
            @click="onSubmit()"
          >
            <span>Create</span>
          </button>
        </div>
      </div>

      <!-- Network table -->
      <div class="network-table generic-table">
      <table class="table table-hover">
          <thead>
              <tr>
                  <th>
                    <span>Code</span>
                    <font-awesome-icon icon="sort" class="fa-icon" />
                  </th>
                  <th>
                    <span>Name</span>
                    <font-awesome-icon icon="sort" class="fa-icon" />
                  </th>
                  <th class="actions">
                    <span>Actions</span>
                  </th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="network in NetworkStore.networks" :key="network._id">
                  <td>{{network.code}}</td>
                  <td>{{network.name}}</td>
                  <div class="actions">
                    <td @click="confirmDelete(network._id)" class="action-icon delete">
                      <font-awesome-icon icon="trash" class="fa-icon" />
                    </td>
                  </div>
              </tr>
          </tbody>
      </table>
    </div>
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import useNetworkStore from '@/store/NetworkStore'
import useSubstationStore from '@/store/SubstationStore'

export default {
  name: 'NetworksTable',
  props: ['substationId'],
  data () {
    return {
      currentNetwork: {
        code: '',
        name: ''
      }
    }
  },
  computed: {
    ...mapStores(
      useNetworkStore,
      useSubstationStore
    )
  },
  async mounted () {
    await this.NetworkStore.getRelatedNetworks(this.substationId)
  },
  methods: {

    /**
     * Submit to create a Network
     */
    async onSubmit () {
      await this.NetworkStore.createNetwork({
        subStationId: this.substationId,
        ...this.currentNetwork
      })
    },

    /**
     * Delete a Network
     */
    async confirmDelete (id) {
      await this.NetworkStore.deleteNetwork(id)
    }
  }
}
</script>

<style lang="scss">
.network-details-container {
  display: flex;
  justify-content: center;
  gap: 50px;
  margin: 30px 0;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
}
</style>
