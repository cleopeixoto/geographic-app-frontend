<template>
  <div class="notification-container" :class="{ 'positive': isSuccess, 'negative': !isSuccess }">
    <div class="notification-wrapper">
      <div class="header">
        <span class="title" v-if="title">{{ title }}</span>
        <font-awesome-icon icon="close" class="fa-icon" @click="onClose()" />
      </div>

      <div class="subtitle" v-if="subtitle">
        <span>{{ subtitle }}</span>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'NotificationComponent',
  props: ['isSuccess', 'title', 'subtitle'],
  methods: {

    /**
     * Emit to close notification
     */
    onClose () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
@import '../styles.scss';

@keyframes smooth-appear {
  from { opacity: 0; }
  to { opacity: 1; }
}

.notification-container {
  position: fixed;
  top: 60px;
  right: 15px;
  width: 230px;
  height: 120px;
  background: white;
  color: $gray-text;
  border-radius: 10px;
  box-shadow: 0px 3px 6px $gray4;
  border: 2px solid $gray3;
  animation: smooth-appear 0.5s ease forwards;
  display: flex;
  justify-content: center;

  &.positive {
    background-color: #dcffd8; // notification green
  }

  &.negative {
    background-color: #ffd4d2;  // notiifcation red
  }

  .notification-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 15px;
    gap: 10px;

    .header {
      display: flex;
      justify-content: center;

      .title {
        font-size: 15px;
      }

      .fa-icon {
        font-size: 18px;
        color: $gray2;
        position: absolute;
        top: 7px;
        right: 7px;

        &:hover {
          cursor: pointer;
          color: rgba(0, 0, 0, 8);
        }
      }
    }

    .account-information, .subtitle {
      font-size: 14px;
      text-align: center;

      .balance {
        font-size: 25px;
      }

      .balance, span {
        font-weight: 600;
      }
    }
  }
}
</style>
