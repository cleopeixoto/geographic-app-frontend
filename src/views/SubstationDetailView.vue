<template>
  <div class="page-container">
    <div class="substation-details-container">
      <div class="substation-card generic-card card">
        <div class="form-title">
          <span v-if="currentMode === SubstationStore.pageModes.CREATE">New Sub-Station</span>
          <span v-if="[SubstationStore.pageModes.READ, SubstationStore.pageModes.UPDATE].includes(currentMode)">Sub-Station information</span>
        </div>

        <div class="form" :class="{'disable-editing': currentMode === SubstationStore.pageModes.READ}">
          <div class="input-group">
            <span>Code:</span>
            <input class="input-field" v-model.trim="currentSubstation.code" maxlength="3">
            <span class="field-error" v-if="triggerSubmit && !currentSubstation.code">Code is required</span>
          </div>

          <div class="input-group">
            <span>Name:</span>
            <input class="input-field" v-model.trim="currentSubstation.name" maxlength="100">
            <span class="field-error" v-if="triggerSubmit && !currentSubstation.name">Name is required</span>
          </div>

          <div class="input-group">
            <span>Latitude:</span>
            <input class="input-field" type="number" v-model.number="currentSubstation.latitude" maxlength="15">
            <span class="field-error" v-if="triggerSubmit && !currentSubstation.latitude">Latitude is required</span>
          </div>

          <div class="input-group">
            <span>Longitude:</span>
            <input class="input-field" type="number" v-model.number="currentSubstation.longitude" maxlength="15">
          </div>
        </div>

        <div class="maps-viewer">
          <iframe
            width="600"
            height="450"
            style="border:0"
            loading="lazy"
            :src="`https://www.google.com/maps/search/?api=1&query=${currentSubstation.latitude},${currentSubstation.longitude}`">
          </iframe>
        </div>

        <div class="form-footer">
          <div class="buttons">
            <button type="button" class="btn secondary-btn" @click="onCancel()">
              <font-awesome-icon icon="rotate-left" class="fa-icon" />
              <span>Cancel</span>
            </button>

            <button type="submit" class="btn primary-btn" v-if="currentMode === SubstationStore.pageModes.CREATE"
              :disabled="hasEmptyRequiredFields"
              @click="onSubmit()"
            >
              <span>Create</span>
            </button>
            <button type="submit" class="btn primary-btn" v-if="currentMode === SubstationStore.pageModes.UPDATE"
              :disabled="hasEmptyRequiredFields || (currentMode === SubstationStore.pageModes.UPDATE)"
              @click="onSubmit()"
            >
              <font-awesome-icon icon="floppy-disk" class="fa-icon" />
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Networks card -->
    <networks-table v-if="currentSubstationId && currentMode !== SubstationStore.pageModes.CREATE" :substation-id="currentSubstationId" />
  </div>

</template>

<script>
import { mapStores } from 'pinia'
import useSubstationStore from '@/store/SubstationStore'

import { useRoute } from 'vue-router'
import NetworksTable from '@/components/NetworksTable.vue'

export default {
  name: 'SubstationDetailView',
  components: {
    NetworksTable
  },
  data () {
    return {
      currentSubstationId: null,
      currentSubstation: {
        code: '',
        name: '',
        latitude: '',
        longitude: ''
      },
      currentMode: null,
      relatedNetworks: [],
      customErrors: {},
      displayNotification: false,
      route: useRoute()
    }
  },
  computed: {
    ...mapStores(
      useSubstationStore
    ),
    hasEmptyRequiredFields () {
      return !this.currentSubstation.code || !this.currentSubstation.name || !this.currentSubstation.latitude
    }
  },
  async mounted () {
    if (this.$route.path.includes('new')) this.currentMode = this.SubstationStore.pageModes.CREATE
    else {
      this.currentMode = this.$route.path.includes('details') ? this.SubstationStore.pageModes.READ : this.SubstationStore.pageModes.UPDATE
      this.currentSubstationId = this.$route.params.id

      this.currentSubstation = await this.SubstationStore.getSubstation(this.currentSubstationId)
    }
  },
  methods: {
    onCancel () {
      this.$router.push({ path: '/home' })
    },

    async onSubmit () {
      // add success message
      await this.SubstationStore.createSubstation(this.currentSubstation)
      this.$router.push({ path: '/home' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles.scss';

.substation-details-container {
  display: flex;
  justify-content: center;
  gap: 50px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
}

// .form-control:focus{
//   box-shadow: none;
// }

// ::ng-deep {
//   .disable-editing {
//     .mdc-line-ripple {
//       display: none;
//     }
//   }

//   .mat-mdc-form-field {
//     padding: 0 !important;
//   }

//   .mat-mdc-text-field-wrapper,
//   .mat-mdc-form-field-hint-wrapper,
//   .mat-mdc-form-field-error-wrapper {
//     padding: 0 0 0 5px !important;
//   }

//   .mat-mdc-form-field-flex {
//     margin-top: 25px !important;
//     padding-bottom: 6px;
//   }

//   .mat-mdc-floating-label {
//     margin-top: 5px !important;
//   }
// }
</style>
