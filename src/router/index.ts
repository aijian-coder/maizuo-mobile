import {createRouter, createWebHistory} from "vue-router"

const router=createRouter({
    history: createWebHistory(),
    routes: [
        {
            path:'/',
            name:"home",
            component: () => import("@/views/home/home.vue"),
        }
    ]
});

export default router