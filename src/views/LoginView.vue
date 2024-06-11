<template>
  <div class="login-form generic-form">
    <div class="input-group">
      <span>Username: </span>
      <input class="input-field" type="text" v-model="username">
    </div>

    <div class="input-group">
      <span>Password: </span>
      <input class="input-field" type="password" v-model="password">
    </div>

    <span class="error-message" v-if="failed">You need to authenticate in order to enter the application</span>

    <button type="submit" class="btn primary-btn" @click="validate()">Enter</button>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data () {
    return {
      username: '',
      password: '',
      failed: false
    }
  },
  methods: {
    validate () {
      this.failed = false

      if (this.username === process.env.VUE_APP_LOGIN_USERNAME && this.password === process.env.VUE_APP_LOGIN_PASSWORD) {
        this.$router.push({ path: '/home' })
        return
      }

      this.failed = true
    }
  }
}
</script>
