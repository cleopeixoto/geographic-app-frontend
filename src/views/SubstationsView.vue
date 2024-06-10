<template>
<div class="substation-container">
    <!-- <router-link to="/substation/new" class="router-link-btn">
      <button class="btn primary-btn new-btn" @click="navigateTo('/substation/new')">New Sub-Station</button>
    </router-link> -->
    <button class="btn primary-btn new-btn" @click="goToNewSubstationView()">New Sub-Station</button>
    <!-- <button class="btn primary-btn new-btn">
      <router-link to="/substation/new">New substation</router-link>
    </button> -->

    <div class="substation-table">
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
                  <td @click="goToSubstationDetails(substation._id)" class="action-icon view">
                    <font-awesome-icon icon="eye" class="fa-icon" />
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
    }
  },
  computed: {
    ...mapStores(
      useSubstationStore
    )
  },
  methods: {
    /**
     * Sort substations array based on a given property (field)
     * @param field Given field to sort based on
     */
    sortBy (field) {
      this.currentSortField = field

      this.SubstationStore.substations.sort((substationA, substationB) => {
        let keyA = substationA[field]
        let keyB = substationB[field]

        if (typeof keyA === 'string') keyA = keyA.toUpperCase()
        if (typeof keyB === 'string') keyB = keyB.toUpperCase()

        if (keyA > keyB) return 1
        if (keyA < keyB) return -1
        return 0 // equals
      })
    },

    /**
     * Delete a substation
     * @param id Substation id
     */
    confirmDelete (id) {
      this.substationService.deleteSubstation(id)
    },

    /**
     * Go to Substation Details page
     * @param substationId The ID of the substation
     */
    goToSubstationDetails (substationId) {
      this.$router.push({ path: `substation/${substationId}/details` })
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

  .substation-table {
    overflow-y: auto;
    max-height: 60vh;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.17);
    border-radius: 5px;

    table {
      border-collapse: collapse;
      width: 100%;

      th, td {
        border: none;
        text-align: start;
        padding: 10px;
      }

      thead {
        position: sticky;
        top: 0;
        background-color: #e1183f !important;
        color: white;

        th {
          font-weight: 500;

          .fa-icon {
            margin-left: 20px;
            color: rgba(255, 255, 255, 0.5);
            cursor: pointer;

            &:hover {
              color: white;
            }
          }

          .current-sort {
              color: white;
          }
        }
      }

      tbody {
        tr {
          &:nth-child(odd) {
            background-color: rgba(0, 0, 0, 0.05);
          }
        }

        .actions {
          .action-icon {
            .fa-icon {
              font-size: 15px;
              cursor: pointer;

              &:hover {
                  color: #e1183f;
              }
            }
          }
        }
      }

      .actions {
        display: flex;
        justify-content: center;
      }
    }
  }

  .new-btn {
    align-self: self-end;
    cursor: pointer;
    font-weight: 500;
    text-transform: uppercase;
    padding: 10px;
  }
}
</style>
