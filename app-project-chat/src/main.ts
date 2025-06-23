import { createApp } from 'vue'
import { auth } from '@/firebase/config';
import App from './App.vue'
import router from './router'
import './assets/main.css'

let app: any = null;
auth.onAuthStateChanged(() => {
    if (!app) {
        app = createApp(App)
        app.use(router)
        app.mount('#app')
    }
})

