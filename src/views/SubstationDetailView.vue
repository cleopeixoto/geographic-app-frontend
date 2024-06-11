<template>
  <notification-component v-if="notification.show"
    :is-success="notification.isSuccess"
    :title="notification.title"
    :subtitle="notification.subtitle"
    @close="closeNotification()"
  />

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
            <span class="error-field" v-if="triggerSubmit && !currentSubstation.code">Code is required</span>
            <span class="error-field" v-if="hasDuplicatedCode">There is already a sub station with this code</span>
          </div>

          <div class="input-group">
            <span>Name:</span>
            <input class="input-field" v-model.trim="currentSubstation.name" maxlength="100">
            <span class="error-field" v-if="triggerSubmit && !currentSubstation.name">Name is required</span>
          </div>

          <div class="input-group">
            <span>Latitude:</span>
            <input class="input-field" type="number" v-model.number="currentSubstation.latitude" maxlength="15">
            <span class="error-field" v-if="triggerSubmit && !currentSubstation.latitude">Latitude is required</span>
          </div>

          <div class="input-group">
            <span>Longitude:</span>
            <input class="input-field" type="number" v-model.number="currentSubstation.longitude" maxlength="15">
          </div>
        </div>

        <div class="maps-viewer" v-if="currentMode === SubstationStore.pageModes.READ">
          <iframe
            width="100%"
            height="300"
            style="border:0"
            loading="lazy"
            :src="`https://maps.google.com/maps?q=${currentSubstation.latitude},${currentSubstation.longitude}&output=embed`">
          </iframe>
        </div>

        <div class="form-footer">
          <div class="buttons">
            <button type="button" class="btn secondary-btn" @click="onCancel()">
              <font-awesome-icon icon="rotate-left" class="fa-icon" />
              <span>Cancel</span>
            </button>

            <button type="submit" class="btn primary-btn" v-if="currentMode === SubstationStore.pageModes.CREATE"
              :disabled="hasEmptyRequiredFields || hasDuplicatedCode"
              @click="onSubmit()"
            >
              <span>Create</span>
            </button>
            <button type="submit" class="btn primary-btn" v-if="currentMode === SubstationStore.pageModes.UPDATE"
              :disabled="hasEmptyRequiredFields || hasDuplicatedCode"
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

import NetworksTable from '@/components/NetworksTable.vue'
import NotificationComponent from '@/components/NotificationComponent.vue'

export default {
  name: 'SubstationDetailView',
  components: {
    NetworksTable,
    NotificationComponent
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
      notification: {
        show: false,
        title: '',
        subtitle: ''
      },
      triggerSubmit: false,
      changed: false
    }
  },
  computed: {
    ...mapStores(
      useSubstationStore
    ),

    /**
     * Check all required fields
     */
    hasEmptyRequiredFields () {
      return !this.currentSubstation.code || !this.currentSubstation.name || !this.currentSubstation.latitude
    },

    /**
     * Verify if is there a duplicated code
     */
    hasDuplicatedCode () {
      let hasDuplicated = false

      this.SubstationStore.substations.forEach((substation) => {
        if (hasDuplicated && this.currentMode === this.SubstationStore.pageModes.CREATE && substation.code === this.currentSubstation.code) {
          hasDuplicated = true
        } else if (hasDuplicated && this.currentMode === this.SubstationStore.pageModes.UPDATE &&
          this.currentSubstation.code === substation.code && this.currentSubstation.code !== this.SubstationStore.selectedSubstation.code
        ) {
          hasDuplicated = true
        }
      })

      return hasDuplicated
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

    /**
     * Submit to create or update a SubStation
     */
    async onSubmit () {
      this.triggerSubmit = true

      try {
        this.notification.isSuccess = true
        if (this.currentMode === this.SubstationStore.pageModes.CREATE) {
          await this.SubstationStore.createSubstation(this.currentSubstation)
          this.notification.title = 'Substation successfully created'
        } else if (this.currentMode === this.SubstationStore.pageModes.UPDATE) {
          await this.SubstationStore.editSubstation(this.currentSubstationId, this.currentSubstation)
          this.notification.title = 'Substation successfully edited'
        }
        this.currentMode = this.SubstationStore.pageModes.READ
      } catch (error) {
        this.notification.isSuccess = false
        this.notification.title = 'Oops. Error'
        this.notification.subtitle = 'We could not perform your request this time. Please, review form and try again.'
      } finally {
        this.notification.show = true

        if (this.notification.isSuccess) {
          setTimeout(() => {
            this.$router.push({ path: '/home' })
          }, 5000)
        }

        this.triggerSubmit = false
      }
    },

    closeNotification () {
      this.notification.show = false
      this.notification.title = ''
      this.notification.subtitle = ''
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

  .disable-editing {
    .input-field {
      pointer-events: none;
      background-color: $gray5;
    }
  }
}
</style>
