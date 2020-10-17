import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/views/Home";


Vue.use(Router)

export default new Router ({
    mode: 'history',
    routes: [
        {
            path:'/',
            component: Home
        },
        {
            name: 'contact',
            path: '/contact/:id',
            component: () => import('./views/ContactCardInfo'),
            props: true
        }
    ]
})