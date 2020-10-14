import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/views/Home";
import ContactCardInfo from "@/views/ContactCardInfo";

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
            path: '/contact/:phone',
            component: ContactCardInfo,
            props: true
        }
    ]
})