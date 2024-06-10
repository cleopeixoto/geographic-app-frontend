<template>
<div class="substation-container">
    <router-link to="/substation/new">
    <!-- <button id="myButton" class="foo bar">Go!</button> -->
    <button class="btn primary-btn new-btn">New Sub-Station</button>
    </router-link>
    <!-- <button class="btn primary-btn new-btn" routerLink="/substation/new">New Substation</button> -->

    <div class="substation-table">
    <table class="table table-hover">
        <thead>
            <tr>
                <th>
                <span>Code #</span>
                <font-awesome-icon icon="sort" :class="{'current-sort': currentSortField === 'code'}" @click="sortBy('code')" />
                <!-- <i class="fa fa-sort" [ngClass]="{'current-sort': currentSortField === 'accountNumber'}" (mouseup)="sortBy('accountNumber')"></i> -->
                </th>
                <th colspan="2">
                <span>Name</span>
                <!-- <i class="fa fa-sort" [ngClass]="{'current-sort': currentSortField === 'name'}" (mouseup)="sortBy('name')"></i> -->
                <font-awesome-icon icon="sort" :class="{'current-sort': currentSortField === 'name'}" @click="sortBy('name')" />
                </th>
                <th colspan="2" class="actions">
                <span>Actions</span>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="substation in SubstationStore.substations" :key="substation._id">
                <td>{{substation.code}}</td>
                <td>{{substation.name}}</td>
                <div class="actions">
                <!-- <td (click)="goToSubstationDetails(substation._id)" class="action-icon view"> -->
                <td @click="goToSubstationDetails(substation._id)" class="action-icon view">
                    <font-awesome-icon icon="eye" />
                    <!-- <i class="fa fa-eye"></i> -->
                </td>
                <td @click="confirmDelete(substation._id)" class="action-icon delete">
                    <font-awesome-icon icon="trash" />
                    <!-- <i class="fa fa-trash"></i> -->
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
      this.router.navigate([`substation/${substationId}/details`]).then()
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
        overflow-x: scroll;
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

            .fa {
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
                i {
                font-size: 20px;
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