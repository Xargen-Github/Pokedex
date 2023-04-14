import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import PrimeVue from 'primevue/config';

import App from './App.vue'
import router from './router'

import 'virtual:windi.css'

import "primevue/resources/themes/tailwind-light/theme.css";     
import "primevue/resources/primevue.min.css";
import 'primeicons/primeicons.css';

import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(PrimeVue)

app.mount('#app')
