import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

if (process.env.NODE_ENV !== 'development' && navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js')
    .then(reg => {
        console.log(reg);
    })
    .catch(er => {
        console.error(er);
    })
}

createApp(App).mount('#app')
