import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'
import Home from './pages/Home.vue'
import Favorites from './pages/Favorites.vue'
import Profile from './pages/Profile.vue'
import ProfileLogin from './pages/Profile-login.vue'

const app = createApp(App)

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/favorites', name: 'Favorites', component: Favorites },
    { path: '/profile', name: 'Profile', component: Profile },
    { path: '/profile/login', name: 'ProfileLogin', component: ProfileLogin },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

app.use(router)
app.use(autoAnimatePlugin)

app.mount('#app')
