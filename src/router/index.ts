import {createRouter, createWebHistory} from "vue-router"

const router=createRouter({
    history: createWebHistory(),
    routes: [
        {
            path:'/',
            name:"home",
            component: () => import("@/views/home/home.vue"),
        },
        {
            path:'/city',
            name:"city",
            component: () => import("@/views/city/index.vue"),
        }
    ]
});

export default router