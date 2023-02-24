import { createWebHistory, createRouter } from "vue-router";
import HomePage from "../components/HomePage.vue";

const routes = [
    {
        path: "/home",
        name: "HomePage",
        component: HomePage,
    },
    // {
    //     path: "/about",
    //     name: "About",
    //     component: About,
    // },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;  