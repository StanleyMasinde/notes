import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './index.css'
// screens
import indexScreen from './screens/index.vue'
import showNoteScreen from './screens/show.vue'
import createScreen from './screens/create.vue'

if (process.env.NODE_ENV !== 'development' && navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js')
        .then(reg => {
            console.log(reg);
        })
        .catch(er => {
            console.error(er);
        })
}

const routes = [
    {
        path: '/',
        component: indexScreen
    },
    {
        path: '/create',
        component: createScreen
    },
    {
        path: '/notes/:id',
        component: showNoteScreen
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

createApp(App)
    .use(router)
    .mount('#app')
