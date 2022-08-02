import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Dashboard from "../views/Dashboard.vue"
import { auth } from "../middleware/auth"

const routes = [{
        path: '/',
        name: 'Login',
        component: Login,
        beforeEnter: auth.adminLogin
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        beforeEnter: auth.adminDashboard
    },
    { path: "/:pathMatch(.*)*", redirect: "/" },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router