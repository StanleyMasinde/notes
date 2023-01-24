import { createApp } from 'vue'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import App from './App.vue'
import './index.css'
// screens
import indexScreen from './screens/index.vue'
import showNoteScreen from './screens/show.vue'
import createScreen from './screens/create.vue'
import editScreen from './screens/edit.vue'
import searchScreen from './screens/search.vue'

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
        path: '/search',
        component: searchScreen
    },
    {
        path: '/create',
        component: createScreen
    },
    {
        path: '/notes/:id',
        component: showNoteScreen
    },
    {
        path: '/notes/:id/edit',
        component: editScreen
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

createApp(App)
    .use(router)
    .mount('#app')
