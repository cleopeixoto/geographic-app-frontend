<template>
<div class="substation-container">
    <button class="btn primary-btn new-btn" @click="goToNewSubstationView()">New Sub-Station</button>

    <div class="substation-table generic-table">
      <table class="table table-hover">
          <thead>
              <tr>
                  <th>
                    <span>Code</span>
                    <font-awesome-icon icon="sort" class="fa-icon" :class="{'current-sort': currentSortField === 'code'}" @click="sortBy('code')" />
                  </th>
                  <th>
                    <span>Name</span>
                    <font-awesome-icon icon="sort" class="fa-icon" :class="{'current-sort': currentSortField === 'name'}" @click="sortBy('name')" />
                  </th>
                  <th class="actions">
                    <span>Actions</span>
                  </th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="substation in SubstationStore.substations" :key="substation._id">
                  <td>{{substation.code}}</td>
                  <td>{{substation.name}}</td>
                  <div class="actions">
                    <td @click="goToSubstationDetails(substation._id, 'details')" class="action-icon view">
                      <font-awesome-icon icon="eye" class="fa-icon" />
                    </td>

                    <td @click="goToSubstationDetails(substation._id, 'edit')" class="action-icon view">
                      <font-awesome-icon icon="edit" class="fa-icon" />
                    </td>

                    <td @click="confirmDelete(substation._id)" class="action-icon delete">
                      <font-awesome-icon icon="trash" class="fa-icon" />
                    </td>
                  </div>
              </tr>
          </tbody>
      </table>
    </div>
</div>
</template>

<script>
import useSubstationStore from '@/store/SubstationStore'
import { mapStores } from 'pinia'

export default {
  name: 'SubstationsView',
  props: {
    msg: String
  },
  data () {
    return {
      currentSortField: ''
    }
  },
  computed: {
    ...mapStores(
      useSubstationStore
    )
  },
  mounted () {
    this.sortBy('name')
  },
  methods: {
    /**
     * Sort substations array based on a given property (field)
     * @param field Given field to sort based on
     */
    sortBy (field) {
      if (this.currentSortField === field) {
        this.SubstationStore.substations.reverse()
        return
      }

      this.currentSortField = field

      this.SubstationStore.substations = this.SubstationStore.substations.sort((substationA, substationB) => {
        if (substationA[field].toUpperCase() > substationB[field].toUpperCase()) return 1
        if (substationA[field].toUpperCase() < substationB[field].toUpperCase()) return -1
        return 0 // equals
      })
    },

    /**
     * Delete a substation
     * @param id Substation id
     */
    async confirmDelete (id) {
      await this.SubstationStore.deleteSubstation(id)
    },

    /**
     * Go to Substation Details page
     * @param substationId The ID of the substation
     */
    goToSubstationDetails (substationId, action) {
      this.$router.push({ path: `substation/${substationId}/${action}` })
    },

    /**
     * Go to New Substation page
     */
    goToNewSubstationView () {
      this.$router.push({ path: '/substation/new' })
    }
  }
}
</script>

<style lang="scss" scoped>

.substation-container {
  display: flex;
  flex-direction: column;
  gap: 50px;

  .new-btn {
    align-self: self-end;
    cursor: pointer;
    font-weight: 500;
    text-transform: uppercase;
    padding: 10px;
  }
}
</style>
