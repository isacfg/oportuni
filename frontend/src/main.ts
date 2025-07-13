import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth.store'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Initialize auth store after mounting
app.mount('#app')

// Initialize auth after app is mounted
const authStore = useAuthStore()
authStore.initializeAuth()
