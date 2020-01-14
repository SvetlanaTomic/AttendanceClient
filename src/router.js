import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import Home from "./views/Home.vue";
import HomeAdmin from "./views/HomeAdmin.vue";
import HomeStats from "./views/HomeStats.vue";
import store from "@/store.js";
// import {
//   Store
// }
// from "vuex";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/home",
      component: Home,
      children: [
        {
          path: "",
          name: "stats",
          component: HomeStats
        },
        {
          path: "/admin",
          name: "admin",
          component: HomeAdmin
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.name != "login" && store.state.user == null) {
    next("/");
  } else {
    next();
  }
});

export default router;
