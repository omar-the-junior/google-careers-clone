import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import '@/index.css'
import App from '@/App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import router from '@/router'

library.add(faSearch)

const pinia = createPinia()

createApp(App)
  .use(router)
  .use(pinia)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
