import { createRouter, createWebHistory } from "vue-router";
import WelcomeItem from "@/components/WelcomeItem.vue";
import TheWelcome from "@/components/TheWelcome.vue";
import HelloWorld from "@/components/HelloWorld.vue";
import MainComp from "@/components/MainComp.vue";

const routes = [
  { path: "/", component: WelcomeItem },
  { path: "/forgotpassword", component: TheWelcome },
  {
    path: "/dashboard/:page",
    name: "Dashboard",
    component: MainComp,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/updatepassword",
    name: "upadatepassword",
    component: HelloWorld,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const storedUser = JSON.parse(sessionStorage.getItem("userSession"));
  if (to.path === "/" && storedUser && storedUser.token) {
    next({ path: `/dashboard/Completed Transactions` });
  }
  else if (to.meta.requiresAuth && (!storedUser || !storedUser.token)) {
    next({ path: "/" });
  }
  // Allow navigation
  else {
    next();
  }
});

export default router;
