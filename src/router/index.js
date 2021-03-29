import Vue from "vue";
import Router from "vue-router";
import indexPage from "@/view/indexPage";
import a from "@/components/a";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "indexPage",
      component: indexPage,
      children: [
        {
          path: "A",
          name: "A",
          component: a
        }
      ]
    }
  ]
});
