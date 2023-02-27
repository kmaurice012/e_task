import { createWebHistory, createRouter } from "vue-router";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";

const routes = [
    {
        path: "/login",
        name: "Login",
        component: Login,
      },
    {
        path: "/",
        name: "Dashboard",
        component: Dashboard,
        children: [
            {
                path: "/task",
                name: "task",
                component: () => import("../components/TaskPage.vue"),
              },
        ]
    },
    
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;  