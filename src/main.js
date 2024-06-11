import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import App from './App.vue'
import router from './router'
import store from './store'

import './styles.scss'

// Icons
import { faSort, faEye, faTrash, faRotateLeft, faEdit, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
library.add(faSort)
library.add(faEye)
library.add(faTrash)
library.add(faRotateLeft)
library.add(faEdit)
library.add(faFloppyDisk)

const pinia = createPinia()

createApp(App)
  .use(store)
  .use(router)
  .use(pinia)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
