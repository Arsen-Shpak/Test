import Vue from 'vue'
import Router from "vue-router";
import Cover from "@/pages/Cover.vue";
import Final from "@/pages/Final.vue";
import Main from "@/pages/Main.vue";
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "cover",
      component: Cover,
    },
    {
      path: "/main",
      name: "main",
      component: Main,
    },
    {
      path: "/Final",
      name: "Final",
      component: Final,
    },
  ],
});

export default router
