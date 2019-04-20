import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import Vuex from 'vuex'
import './plugins/element.js'
import 'core-js'

import app from './components/app.vue'

import Apply from './pages/apply.vue'
import Order from './pages/order.vue'
import Classify from './/pages/classify.vue'
import Sku from './pages/sku.vue'
import System from './pages/system.vue'
import Achievement from './pages/achievement.vue'
import Login from './pages/login.vue'

Vue.config.productionTip = false
Vue.use(Router)
Vue.use(Vuex)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: app,
            redirect:{ name: 'login' }
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/apply',
            name: 'apply',
            component: Apply,
        },
        {
            path: '/order',
            name: 'order',
            component: Order,
        },
        {
            path: '/classify',
            name: 'classify',
            component: Classify,
        },
        {
            path: '/sku',
            name: 'sku',
            component: Sku,
        },
        {
            path: '/system',
            name: 'system',
            component: System,
        },
        {
            path: '/achievement',
            name: 'achievement',
            component: Achievement,
        },
]
})

export default router;

new Vue({
    render: h => h(App),
    router,
}).$mount('#app')