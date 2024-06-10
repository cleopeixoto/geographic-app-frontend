<template>
  <div class="app-container" id="app">
    <nav class="menu">
      <router-link to="/home" class="home">Home</router-link>
    </nav>

    <div class="app-content">
      <router-view />
    </div>

    <div class="app-footer"></div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import useSubstationStore from './store/SubstationStore'

export default {
  name: 'App',
  computed: {
    ...mapStores(
      useSubstationStore
    )
  },
  async mounted () {
    await this.SubstationStore.getSubstations()
  }
}
</script>

<style lang="scss">
@import './styles.scss';

.app-container {
  .menu {
    background-color: $dark-red;
    display: flex;
    flex-direction: row;
    justify-content: end;
    height: 50px;
    align-items: center;

    .home {
      margin: 0 15px 0;
      padding: 15px;
      color: white;
      font-size: 17px;
      font-weight: 500;
      text-transform: uppercase;
      text-decoration: none;
      letter-spacing: 2px;

      &:hover {
        background-color: rgba(255, 255, 255, 0.4);
      }
    }
  }

  .app-content {
    margin: 50px 40px;
  }

  .app-footer {
    width: 100%;
    bottom: 0;
    position: fixed;
    height: 50px;
    background-color: #404040;
  }
}
</style>
